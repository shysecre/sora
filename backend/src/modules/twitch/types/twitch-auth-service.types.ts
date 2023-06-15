import { IsString } from 'class-validator';

export class TwitchAuthServiceProccessAuthReturn {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
