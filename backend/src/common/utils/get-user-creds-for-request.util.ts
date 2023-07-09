import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';

export const getCreds = (user: ParsedJwtUser) => ({
  accessToken: user.creds.accessToken,
  tokenType: user.creds.tokenType,
  twitchId: user.twitchId,
});
