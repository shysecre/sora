import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAuthLinkResponseDTO {
  @ApiProperty({
    description: 'Link that user must navigate to',
    type: String,
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'State for preventing CSRF attacks',
    type: String,
  })
  @IsString()
  state: string;
}

export class ProcessAuthResponseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's access token",
  })
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's refresh token",
  })
  refreshToken: string;
}
