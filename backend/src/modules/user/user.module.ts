import { DatabaseModule } from '@modules/database/database.module';
import { TwitchModule } from '@modules/twitch/twitch.module';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, TwitchModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
