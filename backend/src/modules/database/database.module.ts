import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as entities from '@modules/database/entities';
import { UserDataService } from './services/user-data.service';
import { UserTwitchCredsDataService } from './services/user-twitch-creds-data.service';
import { UserCredsDataService } from './services/user-cred-data.service';
import { LocalCategoryDataService } from './services/category-data.service';
import { LocalCategoryItemDataService } from './services/category-local-item-data.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities,
        synchronize: true,
        logging: ['query', 'error'],
      }),
    }),
  ],
  providers: [
    UserDataService,
    UserTwitchCredsDataService,
    UserCredsDataService,
    LocalCategoryDataService,
    LocalCategoryItemDataService,
  ],
  exports: [
    UserDataService,
    UserTwitchCredsDataService,
    UserCredsDataService,
    LocalCategoryDataService,
    LocalCategoryItemDataService,
  ],
})
export class DatabaseModule {}
