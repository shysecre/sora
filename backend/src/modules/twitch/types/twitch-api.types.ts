import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { string } from 'joi';

export class INCLUDE_AUTH {
  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  tokenType: string;
}

export class GetTwitchApiUserOptions extends INCLUDE_AUTH {}

export class GetTwitchApiUserCustomRewardsOptions extends INCLUDE_AUTH {
  @IsString()
  @ApiProperty()
  twitchId: string;
}

export class GetTwitchApiCategoriesByNameOptions extends INCLUDE_AUTH {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  cursor?: string;
}

export class TwitchApiCategory {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  box_art_url: string;
}

export class TwitchApiImageObject {
  @IsString()
  @ApiProperty()
  url_1x: string;

  @IsString()
  @ApiProperty()
  url_2x: string;

  @IsString()
  @ApiProperty()
  url_4x: string;
}

export class TwitchApiCustomRewardMaxPerStreamSetting {
  @IsBoolean()
  @ApiProperty()
  is_enabled: boolean;

  @IsNumber()
  @ApiProperty()
  max_per_stream: number;
}

export class TwitchApiCustomRewardMaxPerUserPerStreamSetting {
  @IsBoolean()
  @ApiProperty()
  is_enabled: boolean;

  @IsNumber()
  @ApiProperty()
  max_per_user_per_stream: number;
}

export class TwitchApiCustomRewardGlobalCooldownSetting {
  @IsBoolean()
  @ApiProperty()
  is_enabled: boolean;

  @IsNumber()
  @ApiProperty()
  global_cooldown_seconds: number;
}

export class TwitchApiCustomReward {
  @IsString()
  @ApiProperty()
  broadcaster_name: string;

  @IsString()
  @ApiProperty()
  broadcaster_login: string;

  @IsString()
  @ApiProperty()
  broadcaster_id: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsObject()
  @ApiProperty({
    type: TwitchApiImageObject,
  })
  image: TwitchApiImageObject;

  @IsString()
  @ApiProperty()
  background_color: string;

  @IsBoolean()
  @ApiProperty()
  is_enabled: boolean;

  @IsNumber()
  @ApiProperty()
  cost: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  prompt: string;

  @IsBoolean()
  @ApiProperty()
  is_user_input_required: boolean;

  @IsObject()
  @ApiProperty({
    type: TwitchApiCustomRewardMaxPerStreamSetting,
  })
  max_per_stream_setting: TwitchApiCustomRewardMaxPerStreamSetting;

  @IsObject()
  @ApiProperty({
    type: TwitchApiCustomRewardMaxPerUserPerStreamSetting,
  })
  max_per_user_per_stream_setting: TwitchApiCustomRewardMaxPerUserPerStreamSetting;

  @IsObject()
  @ApiProperty({
    type: TwitchApiCustomRewardGlobalCooldownSetting,
  })
  global_cooldown_setting: TwitchApiCustomRewardGlobalCooldownSetting;

  @IsBoolean()
  @ApiProperty()
  is_paused: boolean;

  @IsBoolean()
  @ApiProperty()
  is_in_stock: boolean;

  @IsObject()
  @ApiProperty({
    type: TwitchApiImageObject,
  })
  default_image: TwitchApiImageObject;

  @IsBoolean()
  @ApiProperty()
  should_redemptions_skip_request_queue: boolean;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
  })
  redemptions_redeemed_current_stream: number | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
  })
  cooldown_expires_at: string | null;
}

export class TwitchApiChannel {
  @IsString()
  @ApiProperty()
  broadcaster_id: string;

  @IsString()
  @ApiProperty()
  broadcaster_login: string;

  @IsString()
  @ApiProperty()
  broadcaster_name: string;

  @IsString()
  @ApiProperty()
  broadcaster_language: string;

  @IsString()
  @ApiProperty()
  game_name: string;

  @IsString()
  @ApiProperty()
  game_id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  delay: number;

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
  })
  tags: string[];
}

export class TwitchApiUser {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  login: string;

  @IsString()
  @ApiProperty()
  display_name: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  broadcaster_type: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  profile_image_url: string;

  @IsString()
  @ApiProperty()
  offline_image_url: string;

  @IsNumber()
  @ApiProperty()
  view_count: number;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsDate()
  @ApiProperty()
  created_at: Date;
}

export class GetTwitchApiUsersCustomRewardsResponse {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: TwitchApiCustomReward,
  })
  data: TwitchApiCustomReward[];
}

export class GetTwtichApiUserResponse {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: TwitchApiUser,
  })
  data: TwitchApiUser[];
}

export class GetTwitchApiChannelResponse {
  @IsArray()
  @ApiProperty({
    type: TwitchApiChannel,
    isArray: true,
  })
  data: TwitchApiChannel[];
}

export class GetTwitchApiCategoriesByNameResponse {
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: TwitchApiCategory,
  })
  data: TwitchApiCategory[];

  @IsString()
  @ApiProperty()
  pagination: string;
}

export class GetTwitchApiChannelOptions extends INCLUDE_AUTH {
  twitchId: string;
}

export class CreateEventSubSubscriptionOptions extends INCLUDE_AUTH {
  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty({
    enum: {
      1: '2',
      2: '2',
      beta: 'beta',
    },
  })
  version: '1' | '2' | 'beta';

  @IsObject()
  @ApiProperty({
    type: {
      broadcaster_user_id: string,
    },
  })
  condition: {
    broadcaster_user_id: string;
  };
  @IsObject()
  @ApiProperty({
    type: {
      method: 'webhook | websocket',
      callback: 'string',
      secret: 'string',
    },
  })
  transport: {
    method: 'webhook' | 'websocket';
    callback: string;
    secret: string;
  };
}

export class CreateUserCustomReward {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  cost: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  prompt?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_enabled?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  background_color?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_user_input_required?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_max_per_stream_enabled?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  max_per_stream?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_max_per_user_per_stream_enabled?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  max_per_user_per_stream?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_global_cooldown_enabled?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  global_cooldown_seconds?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  should_redemptions_skip_request_queue?: boolean;
}

export class CreateUserCustomRewardsOptions extends INCLUDE_AUTH {
  @IsString()
  @ApiProperty()
  twitchId: string;

  @IsObject()
  @ApiProperty()
  customReward: CreateUserCustomReward;
}

export class CreateUserCustomRewardResponse extends TwitchApiCustomReward {}
