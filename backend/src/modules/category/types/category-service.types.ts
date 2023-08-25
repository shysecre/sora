import { CreateLocalCategoryDataDTO } from '@modules/category/dto/category-requests.dto';
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
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: CreateLocalCategoryDataDTO,
  })
  data: CreateLocalCategoryDataDTO[];

  @IsString()
  @ApiProperty()
  userId: string;
}
