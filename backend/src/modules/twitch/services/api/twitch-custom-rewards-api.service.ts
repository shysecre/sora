import { RequestManager } from '@common/request-manager/request-manager';
import { createAuthHeader } from '@common/utils/create-auth-header.util';
import { EnvObject } from '@modules/app/types/app.types';
import {
  CreateUserCustomRewardResponse,
  CreateUserCustomRewardsOptions,
} from '@modules/twitch/types/twitch-api.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchCustomRewardApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://api.twitch.tv/helix' });
  }

  public createUserCustomReward({
    twitchId,
    customReward,
    accessToken,
    tokenType,
  }: CreateUserCustomRewardsOptions): Promise<CreateUserCustomRewardResponse> {
    return this.post('channel_points/custom_rewards', {
      body: customReward,
      config: {
        params: {
          broadcaster_id: twitchId,
        },
        headers: {
          Authorization: createAuthHeader(tokenType, accessToken),
          'Client-Id': this.configService.get('CLIENT_ID'),
        },
      },
    });
  }
}
