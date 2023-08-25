import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { TwitchModule } from '@modules/twitch/twitch.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@modules/database/database.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtTwitchStrategy } from '@modules/auth/strategies/jwt-twitch.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '90m' },
      }),
    }),
    DatabaseModule,
    TwitchModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, JwtTwitchStrategy],
})
export class AuthModule {}
