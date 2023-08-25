import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

export class CreateLocalCategoryDataDTO {
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

export class CreateLocalCategoryRequestDTO {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: CreateLocalCategoryDataDTO,
  })
  data: CreateLocalCategoryDataDTO[];
}

export class AddLocalItemsToLocalCategory {
  @ApiProperty({
    description: 'Local category id',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    isArray: true,
    description: 'Local rewards',
    type: () => String,
  })
  @IsArray()
  rewards: string[];
}

export class AddCustomRewardToLocalCategoryRequestDTO {
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'Local category item with category ids',
    type: () => AddCustomRewardToLocalCategoryItemRequestDTO,
  })
  categoryItems: AddCustomRewardToLocalCategoryItemRequestDTO[];
}

class AddCustomRewardToLocalCategoryItemRequestDTO {
  @ApiProperty({
    description: 'Category item id',
  })
  @IsString()
  categoryItemId: string;

  @ApiProperty({
    isArray: true,
    description: 'Array of category ids. Category item will be added to them',
    type: () => String,
  })
  @IsArray({ each: true })
  categoryIds: string[];
}
export class CreateLocalCategoryItemData {
  @IsString()
  @ApiProperty()
  twitchName: string;

  @IsNumber()
  @ApiProperty()
  twitchCost: number;
}

export class CreateLocalCategoryItemRequestDTO {
  @IsArray()
  @ApiProperty({
    type: CreateLocalCategoryItemData,
    isArray: true,
  })
  items: CreateLocalCategoryItemData[];
}
