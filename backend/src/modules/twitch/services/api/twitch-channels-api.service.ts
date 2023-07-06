import { RequestManager } from '@common/request-manager/request-manager';
import { createAuthHeader } from '@common/utils/create-auth-header.util';
import { EnvObject } from '@modules/app/types/app.types';
import {
  GetTwitchApiChannelOptions,
  GetTwitchApiChannelResponse,
} from '@modules/twitch/types/twitch-api.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchChannelsApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://api.twitch.tv/helix' });
  }

  public getChannel({
    accessToken,
    tokenType,
    twitchId,
  }: GetTwitchApiChannelOptions): Promise<GetTwitchApiChannelResponse> {
    return this.get('channels', {
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
