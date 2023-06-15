import { TwitchApiCategory } from '@modules/twitch/types/twitch-api.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GetTwitchCategoriesByNameResponseDTO {
  @IsArray({ each: true })
  @ApiProperty({
    isArray: true,
    description: 'Array of twitch api categories that matched provided name',
    type: TwitchApiCategory,
  })
  data: TwitchApiCategory[];

  @IsString()
  @ApiProperty({
    description: 'Pagination cursor that can be used in next request',
  })
  pagination: string;
}
