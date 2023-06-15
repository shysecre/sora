import { DatabaseModule } from '@modules/database/database.module';
import { TwitchModule } from '@modules/twitch/twitch.module';
import { Module } from '@nestjs/common';
import { CategoryControllerTwitch } from './controllers/category-twitch.controller';
import { CategoryTwitchService } from './services/category-twitch.service';
import { CategoryControllerLocal } from './controllers/category-local.controller';
import { CategoryLocalService } from './services/category-local.service';

@Module({
  imports: [DatabaseModule, TwitchModule],
  controllers: [CategoryControllerTwitch, CategoryControllerLocal],
  providers: [CategoryTwitchService, CategoryLocalService],
})
export class CategoryModule {}
