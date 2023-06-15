import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return HttpStatus.OK;
  }
}
