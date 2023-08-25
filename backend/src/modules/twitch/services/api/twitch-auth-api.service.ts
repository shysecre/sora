import { RequestManager } from '@common/request-manager/request-manager';
import { EnvObject } from '@modules/app/types/app.types';
import {
  GetUserTokenOptions,
  GetUserTokenResponse,
  RefreshUserAccessTokenOptions,
  RefreshUserAccessTokenResponse,
} from '@modules/twitch/types/twitch-auth-api.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TwitchAuthApiService extends RequestManager {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super(axios, { baseURL: 'https://id.twitch.tv/oauth2' });
  }

  public getUserToken(code: string): Promise<GetUserTokenResponse> {
    const client_id = this.configService.get('CLIENT_ID');
    const client_secret = this.configService.get('CLIENT_SECRET');
    const redirect_uri = this.configService
      .get<string>('TWITCH_REDIRECT_URL')
      .replace('{lng}', 'en');

    return this.post<GetUserTokenResponse, GetUserTokenOptions>('token', {
      body: {
        code,
        client_id,
        redirect_uri,
        client_secret,
        grant_type: 'authorization_code',
      },
      config: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    });
  }

  public validateUserAccessToken(accessToken: string) {
    return this.get('validate', {
      config: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }

  public refreshUserAccessToken(
    refreshToken: string,
  ): Promise<RefreshUserAccessTokenResponse> {
    const client_id = this.configService.get('CLIENT_ID');
    const client_secret = this.configService.get('CLIENT_SECRET');

    return this.post<
      RefreshUserAccessTokenResponse,
      RefreshUserAccessTokenOptions
    >('token', {
      body: {
        client_id,
        client_secret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    });
  }
}
