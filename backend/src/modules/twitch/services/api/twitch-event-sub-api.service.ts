import { RequestManager } from '@common/request-manager/request-manager';
import { createAuthHeader } from '@common/utils/create-auth-header.util';
import { EnvObject } from '@modules/app/types/app.types';
import { CreateEventSubSubscriptionOptions } from '@modules/twitch/types/twitch-api.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchEventSubApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://api.twitch.tv/helix' });
  }

  public createEventSubscription({
    accessToken,
    tokenType,
    condition,
    transport,
    type,
    version,
  }: CreateEventSubSubscriptionOptions) {
    return this.post('eventsub/subscriptions', {
      body: {
        condition,
        transport,
        type,
        version,
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
