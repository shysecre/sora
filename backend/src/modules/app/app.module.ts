import { APP_TYPEORM_OPTIONS } from '@modules/app/constants/app-typeorm.const';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(APP_TYPEORM_OPTIONS), AuthModule],
})
export class AppModule {}
