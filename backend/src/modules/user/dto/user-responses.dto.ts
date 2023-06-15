import { TwitchApiCustomReward } from '@modules/twitch/types/twitch-api.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetTwitchUserCustomRewardsResponseDTO {
  @IsArray({ each: true })
  @ApiProperty({
    isArray: true,
    type: TwitchApiCustomReward,
  })
  data: TwitchApiCustomReward[];
}

export class GetUserByIdDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's UUID",
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's twitch id",
  })
  twitchId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's twitch image",
  })
  twitchImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's twitch name",
  })
  twitchName: string;
}
