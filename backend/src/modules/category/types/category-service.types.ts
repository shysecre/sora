import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

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

export class AddCustomRewardToLocalCategoryServiceOptions {
  @IsArray()
  @ApiProperty()
  categoryIds: string[];

  @IsArray()
  @ApiProperty()
  categoryItemIds: string[];
}
