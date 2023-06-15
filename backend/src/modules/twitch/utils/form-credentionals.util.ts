import { GetUserTokenResponse } from '@modules/twitch/types/twitch-auth-api.types';
import { encrypt } from '@common/utils/hashes.util';

export const fomdCredentials = ({
  access_token: accessToken,
  refresh_token: refreshToken,
  token_type: tokenType,
}: GetUserTokenResponse) => {
  accessToken = encrypt(accessToken);
  refreshToken = encrypt(refreshToken);
  tokenType = encrypt(tokenType);

  return {
    accessToken,
    refreshToken,
    tokenType,
  };
};
