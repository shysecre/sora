import { UserTwitchCredentialsEntity } from '@modules/database/entities';
import { UserTwitchCredsDataUpdateByUserIdOptions } from '@modules/database/types/user-twitch-creds-data.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTwitchCredsDataService {
  public updateByUserId({
    userId,
    twitchCredentials,
  }: UserTwitchCredsDataUpdateByUserIdOptions) {
    return UserTwitchCredentialsEntity.update(
      {
        user: {
          id: userId,
        },
      },
      twitchCredentials,
    );
  }
}
