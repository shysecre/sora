import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDataCreateUserCredentialsOptions {
  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  refreshToken: string;

  @IsString()
  @ApiProperty()
  tokenType: string;
}
