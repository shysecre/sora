import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTwitchCategoriesByNameRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Possible name of category to search for',
    example: 'Fort',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Cursor for the next page of the same name search',
  })
  cursor?: string;
}

export class CreateLocalCategoryRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category',
  })
  twitchName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the category',
  })
  twitchId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image of the category',
  })
  twitchBoxImage: string;
}

export class AddCustomRewardToLocalCategoryRequestDTO {
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'Local category UUIDs',
    type: () => String,
  })
  categoryIds: string[];

  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'Local category item UUIDs',
    type: () => String,
  })
  categoryItemIds: string[];
}

export class CreateLocalCategoryItemRequestDTO {
  @IsString()
  @ApiProperty()
  test: string;
}
