import { TwitchEventSubService } from '@modules/twitch/services/twitch-event-sub.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('twitch')
export class TwitchController {
  constructor(private twitchEventSubService: TwitchEventSubService) {}

  @Post('eventsub')
  @ApiHideProperty()
  async proccessWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    return this.twitchEventSubService.processWebhook(req, res, body);
  }
}
