import { capitalizeFirstLetter } from '@common/utils/capitalize-first-letter.util';
import { EnvObject } from '@modules/app/types/app.types';
import { ProcessAuthDTO } from '@modules/twitch/dto/auth-requests.dto';
import { GetAuthLinkResponseDTO } from '@modules/twitch/dto/auth-responses.dto';
import { fomdCredentials } from '@modules/twitch/utils/form-credentionals.util';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDataService } from '@modules/database/services/user-data.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { TwitchAuthServiceProccessAuthReturn } from '../types/twitch-auth-service.types';
import { AuthServiceCreateTokensReturn } from '@modules/auth/types/auth-service.types';
import { decrypt, hash } from '@common/utils/hashes.util';
import { generateRandomState } from '@common/utils/generate-random-state.util';
import { TwitchAuthApiService } from './api/twitch-auth-api.service';
import { UserEntity } from '@modules/database/entities';
import {
  TwitchChannelsApiService,
  TwitchEventSubApiService,
  TwitchUserApiService,
} from '@modules/twitch/services';

@Injectable()
export class TwitchAuthService {
  constructor(
    private configService: ConfigService<EnvObject, true>,
    private twitchAuthApiService: TwitchAuthApiService,
    private twitchUserApiService: TwitchUserApiService,
    private twitchChannelsApiService: TwitchChannelsApiService,
    private twitchEventSubApiService: TwitchEventSubApiService,
    private userDataService: UserDataService,
    private authService: AuthService,
    private logger: Logger,
  ) {}

  public getAuthLink(lng: string): GetAuthLinkResponseDTO {
    const state = generateRandomState(32);
    const url = 'https://id.twitch.tv/oauth2/authorize';
    const states = ['channel:manage:redemptions'];

    const redirect_uri: string = this.configService
      .get<string>('TWITCH_REDIRECT_URL')
      .replace('{lng}', lng);

    const client_id = this.configService.get('CLIENT_ID');

    const searchParams = new URLSearchParams({
      response_type: 'code',
      scope: states.join(' '),
      force_verify: 'true',
      redirect_uri,
      client_id,
      state,
    });

    return {
      link: `${url}?${searchParams}`,
      state,
    };
  }

  public async processAuth(
    body: ProcessAuthDTO,
  ): Promise<TwitchAuthServiceProccessAuthReturn> {
    const twitchUserTokenData = await this.twitchAuthApiService.getUserToken(
      body.code,
    );

    if (!twitchUserTokenData) {
      throw new HttpException("Can't auth user", HttpStatus.BAD_GATEWAY);
    }

    const twitchUserData = await this.twitchUserApiService.getUser({
      accessToken: twitchUserTokenData.access_token,
      tokenType: capitalizeFirstLetter(twitchUserTokenData.token_type),
    });

    if (!twitchUserData) {
      throw new HttpException(
        "Can't get twitch user data",
        HttpStatus.BAD_GATEWAY,
      );
    }

    const foundTwitchUser = twitchUserData.data[0];
    const formdCredentials = fomdCredentials(twitchUserTokenData);

    const twitchChannelData = await this.twitchChannelsApiService.getChannel({
      accessToken: twitchUserTokenData.access_token,
      tokenType: capitalizeFirstLetter(twitchUserTokenData.token_type),
      twitchId: foundTwitchUser.id,
    });

    const foundUserChannel = twitchChannelData.data[0];

    let foundUser = await this.userDataService.getByTwitchId(
      foundTwitchUser.id,
      {
        relations: {
          twitch_credentials: true,
        },
      },
    );

    let tokens: AuthServiceCreateTokensReturn = null;

    if (!foundUser) {
      foundUser = await this.userDataService.create({
        twitch_id: foundTwitchUser.id,
        twitch_credentials: formdCredentials,
        twitch_image: foundTwitchUser.profile_image_url,
        twitch_name: foundTwitchUser.display_name,
        last_category: foundUserChannel.game_id,
      });

      tokens = this.authService.createTokens(foundUser.id);

      await this.authService.saveRefreshToken(
        foundUser.id,
        hash(tokens.refreshToken),
      );
    } else {
      foundUser.twitch_image = foundTwitchUser.profile_image_url;
      foundUser.twitch_name = foundTwitchUser.display_name;
      foundUser.last_category = foundUserChannel.game_id;

      foundUser.twitch_credentials.access_token = formdCredentials.access_token;
      foundUser.twitch_credentials.refresh_token =
        formdCredentials.refresh_token;
      foundUser.twitch_credentials.token_type = formdCredentials.token_type;
      foundUser.twitch_credentials.expire_date = formdCredentials.expire_date;

      tokens = this.authService.createTokens(foundUser.id);

      await UserEntity.save(foundUser);

      await this.authService.updateRefreshToken(
        foundUser.id,
        hash(tokens.refreshToken),
      );
    }

    if (!foundUser.is_subscribed) {
      try {
        await this.twitchEventSubApiService.createEventSubscription({
          accessToken: twitchUserTokenData.access_token,
          tokenType: capitalizeFirstLetter(twitchUserTokenData.token_type),
          condition: {
            broadcaster_user_id: foundTwitchUser.id,
          },
          transport: {
            callback: this.configService.get('TWITCH_EVENT_SUB_CALLBACK'),
            method: 'webhook',
            secret: this.configService.get('TWITCH_EVENT_SUB_SECRET'),
          },
          type: 'channel.update',
          version: 'beta',
        });
      } catch (err) {
        this.logger.error(
          `Error happened when trying to subscribe user ${foundUser.twitch_name}`,
        );
      }
    }

    return tokens;
  }

  public async validateTwitchAccessToken(user: UserEntity) {
    const validateResult = {
      isValid: false,
      tokens: {
        accessToken: null,
        refreshToken: null,
        tokenType: null,
      },
    };

    validateResult.tokens = {
      accessToken: decrypt(user.twitch_credentials.access_token),
      refreshToken: decrypt(user.twitch_credentials.refresh_token),
      tokenType: capitalizeFirstLetter(
        decrypt(user.twitch_credentials.token_type),
      ),
    };

    const currentDate = new Date();
    const expireDate = new Date(user.twitch_credentials.expire_date);

    const leftTime = expireDate.getTime() - currentDate.getTime();

    if (
      currentDate.getTime() >= expireDate.getTime() ||
      leftTime < 1000 * 60 * 2
    ) {
      const refreshedToken = await this.twitchAuthApiService
        .refreshUserAccessToken(validateResult.tokens.refreshToken)
        .then((res) => {
          validateResult.isValid = true;

          return res;
        })
        .catch(() => {
          validateResult.isValid = false;
        });

      if (!refreshedToken) return validateResult;

      validateResult.tokens = {
        accessToken: refreshedToken.access_token,
        refreshToken: refreshedToken.refresh_token,
        tokenType: refreshedToken.token_type,
      };

      const formdCredentials = fomdCredentials(refreshedToken);

      await UserEntity.save({
        ...user,
        twitch_credentials: {
          ...user.twitch_credentials,
          ...formdCredentials,
        },
      });
    } else {
      await this.twitchAuthApiService
        .validateUserAccessToken(validateResult.tokens.accessToken)
        .then(() => {
          validateResult.isValid = true;
        })
        .catch(() => {
          validateResult.isValid = false;
        });
    }

    return validateResult;
  }
}
