import { IsObject, IsString } from 'class-validator';

export class AuthServiceCreateTokensReturn {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class ParsedJwtUser {
  @IsString()
  id: string;

  @IsString()
  twitchId: string;

  @IsObject()
  creds: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
}
