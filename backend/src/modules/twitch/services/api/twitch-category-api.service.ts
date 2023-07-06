import { RequestManager } from '@common/request-manager/request-manager';
import { createAuthHeader } from '@common/utils/create-auth-header.util';
import { EnvObject } from '@modules/app/types/app.types';
import {
  GetTwitchApiCategoriesByNameOptions,
  GetTwitchApiCategoriesByNameResponse,
} from '@modules/twitch/types/twitch-api.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchCategoryApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://api.twitch.tv/helix' });
  }

  public getTwitchCategoriesByName({
    name,
    accessToken,
    tokenType,
    cursor,
  }: GetTwitchApiCategoriesByNameOptions): Promise<GetTwitchApiCategoriesByNameResponse> {
    const body = cursor
      ? {
          query: name,
          after: cursor,
        }
      : {
          query: name,
        };

    return this.get('search/categories', {
      body,
      config: {
        headers: {
          Authorization: createAuthHeader(tokenType, accessToken),
          'Client-Id': this.configService.get('CLIENT_ID'),
        },
      },
    });
  }
}
