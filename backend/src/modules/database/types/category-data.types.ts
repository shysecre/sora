import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CategoryDataCreateLocalCategoryOptions {
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  twitchId: string;

  @IsString()
  @ApiProperty()
  twitchName: string;

  @IsString()
  @ApiProperty()
  twitchBoxImage: string;
}
