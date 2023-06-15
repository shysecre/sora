import { UserDataCreateUserCredentialsOptions } from '@modules/database/types/user-data.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class UserTwitchCredsDataUpdateByUserIdOptions {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsObject()
  @ApiProperty({
    type: UserDataCreateUserCredentialsOptions,
  })
  twitchCredentials: UserDataCreateUserCredentialsOptions;
}
