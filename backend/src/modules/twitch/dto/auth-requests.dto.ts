import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessAuthDTO {
  @ApiProperty({
    description: 'Code that twitch api return when you loggin via auth link',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class RefreshTokensDTO {
  @ApiProperty({
    description: "User's refresh token",
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
