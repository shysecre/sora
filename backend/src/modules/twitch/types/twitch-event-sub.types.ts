import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export const TWITCH_EVENT_SUB_HEADERS = {
  TWITCH_MESSAGE_ID: 'twitch-eventsub-message-id',
  TWITCH_MESSAGE_TIMESTAMP: 'twitch-eventsub-message-timestamp',
  TWITCH_MESSAGE_SIGNATURE: 'twitch-eventsub-message-signature',
  MESSAGE_TYPE: 'twitch-eventsub-message-type',
};

export const TWITCH_EVENT_SUB_MESSAGE_TYPES = {
  MESSAGE_TYPE_VERIFICATION: 'webhook_callback_verification',
  MESSAGE_TYPE_NOTIFICATION: 'notification',
  MESSAGE_TYPE_REVOCATION: 'revocation',
};

export class TwitchEventSubChannelUpdateEventData {
  subscription: Subscription;
  event: ChannelUpdateData;
}

export class TwitchEventSubRevocationData {
  subscription: Subscription;
}

export class TwitchEventSubChallengeData {
  @IsString()
  @ApiProperty()
  challenge: string;
  subscription: Subscription;
}

export type TwitchEventSubBodyTypeUnion =
  | TwitchEventSubChallengeData
  | TwitchEventSubRevocationData
  | TwitchEventSubChannelUpdateEventData;

class ChannelUpdateData {
  @IsString()
  @ApiProperty()
  broadcaster_user_id: string;

  @IsString()
  @ApiProperty()
  broadcaster_user_login: string;

  @IsString()
  @ApiProperty()
  broadcaster_user_name: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  language: string;

  @IsString()
  @ApiProperty()
  category_id: string;

  @IsString()
  @ApiProperty()
  category_name: string;

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
  })
  content_classification_labels: string[];
}

class Subscription {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  version: string;

  @IsNumber()
  @ApiProperty()
  cost: number;

  condition: Condition;

  transport: Transport;

  @IsString()
  @ApiProperty()
  created_at: string;
}

class Condition {
  @IsString()
  @ApiProperty()
  broadcaster_user_id: string;
}

class Transport {
  @IsString()
  @ApiProperty()
  method: string;

  @IsString()
  @ApiProperty()
  callback: string;
}
