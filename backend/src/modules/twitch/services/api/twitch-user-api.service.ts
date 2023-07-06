import { RequestManager } from '@common/request-manager/request-manager';
import { createAuthHeader } from '@common/utils/create-auth-header.util';
import { EnvObject } from '@modules/app/types/app.types';
import {
  GetTwitchApiUserOptions,
  GetTwtichApiUserResponse,
  GetTwitchApiUserCustomRewardsOptions,
} from '@modules/twitch/types/twitch-api.types';
import { GetTwitchUserCustomRewardsResponseDTO } from '@modules/user/dto/user-responses.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchUserApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://api.twitch.tv/helix' });
  }

  public getUser({
    accessToken,
    tokenType,
  }: GetTwitchApiUserOptions): Promise<GetTwtichApiUserResponse> {
    return this.get('users', {
      config: {
        headers: {
          Authorization: createAuthHeader(tokenType, accessToken),
          'Client-Id': this.configService.get('CLIENT_ID'),
        },
      },
    });
  }

  public getUserCustomRewards({
    accessToken,
    tokenType,
    twitchId,
  }: GetTwitchApiUserCustomRewardsOptions): Promise<GetTwitchUserCustomRewardsResponseDTO> {
    return this.get('channel_points/custom_rewards', {
      body: {
        broadcaster_id: twitchId,
      },
      config: {
        headers: {
          Authorization: createAuthHeader(tokenType, accessToken),
          'Client-Id': this.configService.get('CLIENT_ID'),
        },
      },
    });
  }
}
