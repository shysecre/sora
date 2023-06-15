import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCredsCreateUpdateData {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  refreshToken: string;
}
