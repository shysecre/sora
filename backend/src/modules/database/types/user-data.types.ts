import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDataCreateUserCredentialsOptions {
  @IsString()
  @ApiProperty()
  access_token: string;

  @IsString()
  @ApiProperty()
  refresh_token: string;

  @IsString()
  @ApiProperty()
  token_type: string;
}
