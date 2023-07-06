import { AuthService } from '@modules/auth/services/auth.service';
import { DatabaseModule } from '@modules/database/database.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TwitchController } from '@modules/twitch/controller/twitch.controller';
import {
  TwitchEventSubService,
  TwitchAuthApiService,
  TwitchCategoryApiService,
  TwitchCustomRewardApiService,
  TwitchEventSubApiService,
  TwitchUserApiService,
  TwitchAuthService,
  TwitchChannelsApiService,
} from '@modules/twitch/services';

@Module({
  controllers: [TwitchController],
  imports: [ConfigModule, DatabaseModule],
  providers: [
    TwitchEventSubService,
    TwitchAuthService,
    TwitchAuthApiService,
    TwitchCategoryApiService,
    TwitchCustomRewardApiService,
    TwitchEventSubApiService,
    TwitchUserApiService,
    TwitchChannelsApiService,
    AuthService,
    JwtService,
    Logger,
  ],
  exports: [
    TwitchAuthService,
    TwitchAuthApiService,
    TwitchCategoryApiService,
    TwitchCustomRewardApiService,
    TwitchChannelsApiService,
    TwitchUserApiService,
    TwitchEventSubApiService,
  ],
})
export class TwitchModule {}
