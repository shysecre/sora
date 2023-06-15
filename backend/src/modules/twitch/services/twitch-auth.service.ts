import { capitalizeFirstLetter } from '@common/utils/capitalize-first-letter.util';
import { EnvObject } from '@modules/app/types/app.types';
import { ProcessAuthDTO } from '@modules/twitch/dto/auth-requests.dto';
import { GetAuthLinkResponseDTO } from '@modules/twitch/dto/auth-responses.dto';
import { fomdCredentials } from '@modules/twitch/utils/form-credentionals.util';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitchApiService } from './api/twitch-api.service';
import { UserDataService } from '@modules/database/services/user-data.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { TwitchAuthServiceProccessAuthReturn } from '../types/twitch-auth-service.types';
import { AuthServiceCreateTokensReturn } from '@modules/auth/types/auth-service.types';
import { hash } from '@common/utils/hashes.util';
import { generateRandomState } from '@common/utils/generate-random-state.util';
import { TwitchAuthApiService } from './api/twitch-auth-api.service';
import { UserEntity } from '@modules/database/entities';

@Injectable()
export class TwitchAuthService {
  constructor(
    private configService: ConfigService<EnvObject, true>,
    private twitchAuthApiService: TwitchAuthApiService,
    private twitchApiService: TwitchApiService,
    private userDataService: UserDataService,
    private authService: AuthService,
  ) {}

  public getAuthLink(): GetAuthLinkResponseDTO {
    const state = generateRandomState(10);
    const url = 'https://id.twitch.tv/oauth2/authorize';
    const states = ['channel:manage:redemptions'];

    const redirect_uri = this.configService.get('TWITCH_REDIRECT_URL');
    const client_id = this.configService.get('CLIENT_ID');

    const searchParams = new URLSearchParams({
      response_type: 'code',
      scope: states.join(' '),
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

    const twitchUserData = await this.twitchApiService.getUser({
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

    let foundUser = await this.userDataService.getByTwitchId(
      foundTwitchUser.id,
      { twitchCredentials: true },
    );

    let tokens: AuthServiceCreateTokensReturn = null;

    if (!foundUser) {
      foundUser = await this.userDataService.create({
        twitchId: foundTwitchUser.id,
        twitchCredentials: formdCredentials,
        twitchImage: foundTwitchUser.profile_image_url,
        twitchName: foundTwitchUser.display_name,
      });

      tokens = this.authService.createTokens(foundUser.id);

      await this.authService.saveRefreshToken(
        foundUser.id,
        hash(tokens.refreshToken),
      );
    } else {
      foundUser.twitchImage = foundTwitchUser.profile_image_url;
      foundUser.twitchName = foundTwitchUser.display_name;
      foundUser.twitchCredentials.accessToken = formdCredentials.accessToken;
      foundUser.twitchCredentials.refreshToken = formdCredentials.refreshToken;
      foundUser.twitchCredentials.tokenType = formdCredentials.tokenType;

      tokens = this.authService.createTokens(foundUser.id);

      await UserEntity.save(foundUser);

      await this.authService.updateRefreshToken(
        foundUser.id,
        hash(tokens.refreshToken),
      );
    }

    return tokens;
  }
}
