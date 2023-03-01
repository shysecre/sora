import { generateRandomState } from '@common/utils/generate-random-state.util';
import { GetAuthLinkResponseDTO } from '@modules/auth/dto/auth-responses.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuthLink(): GetAuthLinkResponseDTO {
    const url = 'https://id.twitch.tv/oauth2/authorize';
    const states = ['channel:manage:redemptions'];

    const searchParams = new URLSearchParams({
      state: generateRandomState(10),
      scope: states.join(' '),
      redirect_uri: process.env.TWITCH_REDIRECT_URL,
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
    });

    return { link: `${url}?${searchParams}` };
  }
}
