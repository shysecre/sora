import { GetUserTokenResponse } from '@modules/twitch/types/twitch-auth-api.types';
import { encrypt } from '@common/utils/hashes.util';

export const fomdCredentials = ({
  access_token,
  refresh_token,
  token_type,
  expires_in,
}: GetUserTokenResponse) => {
  access_token = encrypt(access_token);
  refresh_token = encrypt(refresh_token);
  token_type = encrypt(token_type);

  return {
    access_token,
    refresh_token,
    token_type,
    expire_date: new Date(Date.now() + expires_in * 1000).toString(),
  };
};
