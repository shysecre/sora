import { TwitchApiCustomReward } from '@modules/twitch/types/twitch-api.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

class GetTwitchUserCustomRewardTwitchReward extends TwitchApiCustomReward {
  @ApiProperty()
  @IsBoolean()
  isTwitchReward: boolean;
}
class GetTwitchUserCustomRewardManagebleReward extends TwitchApiCustomReward {
  @ApiProperty()
  @IsBoolean()
  isManagebleReward: boolean;
}
class GetTwitchUserCustomRewardLocalReward extends TwitchApiCustomReward {
  @ApiProperty()
  @IsBoolean()
  isLocalReward: boolean;

  @ApiProperty()
  @IsUUID()
  local_id: string;
}

export class GetTwitchUserCustomRewardsResponseDTO {
  data: (
    | GetTwitchUserCustomRewardTwitchReward
    | GetTwitchUserCustomRewardManagebleReward
    | GetTwitchUserCustomRewardLocalReward
  )[];
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
  twitch_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's twitch image",
  })
  twitch_image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's twitch name",
  })
  twitch_name: string;
}
