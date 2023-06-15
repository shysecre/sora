import { AuthService } from '@modules/auth/services/auth.service';
import { DatabaseModule } from '@modules/database/database.module';
import { TwitchApiService } from '@modules/twitch/services/api/twitch-api.service';
import { TwitchAuthService } from '@modules/twitch/services/twitch-auth.service';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TwitchAuthApiService } from './services/api/twitch-auth-api.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    TwitchAuthService,
    TwitchAuthApiService,
    TwitchApiService,
    AuthService,
    JwtService,
    Logger,
  ],
  exports: [TwitchAuthService, TwitchAuthApiService, TwitchApiService],
})
export class TwitchModule {}
