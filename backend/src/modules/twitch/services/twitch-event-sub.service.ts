import { getHmac } from '@common/utils/hashes.util';
import { EnvObject } from '@modules/app/types/app.types';
import {
  TWITCH_EVENT_SUB_HEADERS,
  TWITCH_EVENT_SUB_MESSAGE_TYPES,
  TwitchEventSubChallengeData,
  TwitchEventSubChannelUpdateEventData,
  TwitchEventSubRevocationData,
} from '@modules/twitch/types/twitch-event-sub.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { Response } from 'express';

@Injectable()
export class TwitchEventSubService {
  constructor(private configService: ConfigService<EnvObject>) {}

  public processWebhook(req: Request, res: Response, body) {
    const { TWITCH_MESSAGE_SIGNATURE, MESSAGE_TYPE } = TWITCH_EVENT_SUB_HEADERS;
    const {
      MESSAGE_TYPE_NOTIFICATION,
      MESSAGE_TYPE_REVOCATION,
      MESSAGE_TYPE_VERIFICATION,
    } = TWITCH_EVENT_SUB_MESSAGE_TYPES;

    const secret = this.configService.get('TWITCH_EVENT_SUB_SECRET');
    const message = this.getHmacMessage(req);
    const hmac = getHmac(secret, message);

    if (
      true === this.verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])
    )
      return res.sendStatus(418);

    const messageType = req.headers[MESSAGE_TYPE];

    switch (messageType) {
      case MESSAGE_TYPE_NOTIFICATION:
        return this.processNotificationWebhook(res, body);
      case MESSAGE_TYPE_REVOCATION:
        return this.processRevocationWebhook(res, body);
      case MESSAGE_TYPE_VERIFICATION:
        return this.processVerificationWebhook(res, body);
    }
  }

  private async processNotificationWebhook(
    res: Response,
    body: TwitchEventSubChannelUpdateEventData,
  ) {
    res.sendStatus(204);

    /*
      TODO: Check last_category and category in update event

      If they are the same - do nothing
      If they are different - change rewards
    */
  }

  private async processRevocationWebhook(
    res: Response,
    body: TwitchEventSubRevocationData,
  ) {
    res.sendStatus(204);

    /*
      TODO: Set is_subscribed to false
    */
  }

  private async processVerificationWebhook(
    res: Response,
    body: TwitchEventSubChallengeData,
  ) {
    res.status(200).send(body.challenge);

    /*
      TODO: Set is_subscribed to true
    */
  }

  private getHmacMessage(req: Request) {
    const { TWITCH_MESSAGE_ID, TWITCH_MESSAGE_TIMESTAMP } =
      TWITCH_EVENT_SUB_HEADERS;

    return (
      req.headers[TWITCH_MESSAGE_ID] +
      req.headers[TWITCH_MESSAGE_TIMESTAMP] +
      req.body
    );
  }

  private verifyMessage(hmac: string, verifySignature: string) {
    const HMAC_PREFIX = 'sha256=';

    return timingSafeEqual(
      Buffer.from(HMAC_PREFIX + hmac),
      Buffer.from(verifySignature),
    );
  }
}
