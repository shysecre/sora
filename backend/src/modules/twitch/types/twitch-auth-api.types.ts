import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserTokenOptions {
  @IsString()
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  redirect_uri: string;

  @IsString()
  @ApiProperty()
  client_id: string;

  @IsString()
  @ApiProperty()
  client_secret: string;

  @IsString()
  @ApiProperty()
  grant_type: 'authorization_code';
}

export class GetUserTokenResponse {
  @IsString()
  @ApiProperty()
  access_token: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  expires_in?: number;

  @IsString()
  @ApiProperty()
  refresh_token: string;

  @IsArray()
  @ApiPropertyOptional({
    type: [String],
  })
  scope?: string[];

  @IsString()
  @ApiProperty()
  token_type: string;
}

export class RefreshUserAccessTokenOptions {
  @IsString()
  @ApiProperty()
  client_id: string;

  @IsString()
  @ApiProperty()
  client_secret: string;

  @IsString()
  @ApiProperty()
  grant_type: 'refresh_token';

  @IsString()
  @ApiProperty()
  refresh_token: string;
}

export class RefreshUserAccessTokenResponse {
  @IsString()
  @ApiProperty()
  access_token: string;

  @IsString()
  @ApiProperty()
  refresh_token: string;

  @IsArray()
  @ApiProperty({
    type: [String],
  })
  scope: string[];

  @IsString()
  @ApiProperty()
  token_type: string;
}
