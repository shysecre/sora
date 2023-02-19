import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_TYPEORM_OPTIONS } from 'src/modules/app/constants/app-typeorm.const';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(APP_TYPEORM_OPTIONS)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
