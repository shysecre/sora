import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
