import { APP_CONFIG_OPTIONS } from '@modules/app/constants/app-config.const';
import { AppController } from '@modules/app/controllers/app.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoryModule } from '@modules/category/category.module';
import { DatabaseModule } from '@modules/database/database.module';
import { TwitchModule } from '@modules/twitch/twitch.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(APP_CONFIG_OPTIONS),
    DatabaseModule,
    AuthModule,
    UserModule,
    TwitchModule,
    CategoryModule,
  ],
})
export class AppModule {}
