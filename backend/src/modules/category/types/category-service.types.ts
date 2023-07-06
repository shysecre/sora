import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCategoriesByNameServiceOptions {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  tokenType: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  cursor?: string;
}

export class CreateLocalCategoryServiceOptions {
  @IsString()
  @ApiProperty()
  twitchName: string;

  @IsString()
  @ApiProperty()
  twitchId: string;

  @IsString()
  @ApiProperty()
  twitchBoxImage: string;

  @IsString()
  @ApiProperty()
  userId: string;
}
