import { capitalizeFirstLetter } from '@common/utils/capitalize-first-letter.util';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';
import { UserDataService } from '@modules/database/services/user-data.service';
import { UserTwitchCredsDataService } from '@modules/database/services/user-twitch-creds-data.service';
import { fomdCredentials } from '@modules/twitch/utils/form-credentionals.util';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  TwitchAuthApiService,
  TwitchUserApiService,
} from '@modules/twitch/services';

@Injectable()
export class UserService {
  constructor(
    private userDataService: UserDataService,
    private twitchUserApiService: TwitchUserApiService,
    private twitchAuthApiService: TwitchAuthApiService,
    private userTwitchCredsDataService: UserTwitchCredsDataService,
  ) {}

  public async getUserById(id: string) {
    const foundUser = await this.userDataService.getUserById(id);

    if (!foundUser)
      throw new HttpException(
        'User with provided ID was not found',
        HttpStatus.NOT_FOUND,
      );

    return foundUser;
  }

  public async getUserCustomRewards({ id, twitchId, creds }: ParsedJwtUser) {
    try {
      return this.twitchUserApiService.getUserCustomRewards({
        accessToken: creds.accessToken,
        tokenType: creds.tokenType,
        twitchId,
      });
    } catch (err) {
      if (err.response.status !== 401)
        throw new HttpException(
          'Something bad happened',
          HttpStatus.BAD_REQUEST,
        );

      const refreshedTokens =
        await this.twitchAuthApiService.refreshUserAccessToken(
          creds.refreshToken,
        );

      await this.userTwitchCredsDataService.updateByUserId({
        userId: id,
        twitchCredentials: fomdCredentials(refreshedTokens),
      });

      return this.twitchUserApiService.getUserCustomRewards({
        accessToken: refreshedTokens.access_token,
        tokenType: capitalizeFirstLetter(refreshedTokens.token_type),
        twitchId,
      });
    }
  }
}
