import { capitalizeFirstLetter } from '@common/utils/capitalize-first-letter.util';
import { decrypt, getHmac } from '@common/utils/hashes.util';
import { EnvObject } from '@modules/app/types/app.types';
import { CategoryEntity, UserEntity } from '@modules/database/entities';
import { UserDataService } from '@modules/database/services/user-data.service';
import { TwitchCustomRewardApiService } from '@modules/twitch/services/api/twitch-custom-rewards-api.service';
import { TwitchUserApiService } from '@modules/twitch/services/api/twitch-user-api.service';
import {
  TWITCH_EVENT_SUB_HEADERS,
  TWITCH_EVENT_SUB_MESSAGE_TYPES,
  TwitchEventSubBodyTypeUnion,
  TwitchEventSubChallengeData,
  TwitchEventSubChannelUpdateEventData,
} from '@modules/twitch/types/twitch-event-sub.types';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { Response } from 'express';

@Injectable()
export class TwitchEventSubService {
  constructor(
    private configService: ConfigService<EnvObject>,
    private userDataService: UserDataService,
    private twitchUserApiService: TwitchUserApiService,
    private twitchCustomRewardApiService: TwitchCustomRewardApiService,
    private logger: Logger,
  ) {}

  public async processWebhook(
    req: Request,
    res: Response,
    body: TwitchEventSubBodyTypeUnion,
  ) {
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
    ) {
      this.logger.log(
        `Can't verify secret for ${body.subscription.condition.broadcaster_user_id}`,
      );

      return res.sendStatus(418);
    }

    const messageType = req.headers[MESSAGE_TYPE];

    const uid =
      messageType === MESSAGE_TYPE_VERIFICATION
        ? '411929713'
        : body.subscription.condition.broadcaster_user_id;

    switch (messageType) {
      case MESSAGE_TYPE_NOTIFICATION:
        return this.processNotificationWebhook(
          uid,
          res,
          body as TwitchEventSubChannelUpdateEventData,
        );
      case MESSAGE_TYPE_REVOCATION:
        return this.processRevocationWebhook(uid, res);
      case MESSAGE_TYPE_VERIFICATION:
        return this.processVerificationWebhook(
          uid,
          res,
          body as TwitchEventSubChallengeData,
        );
    }
  }

  private async processNotificationWebhook(
    userId: string,
    res: Response,
    body: TwitchEventSubChannelUpdateEventData,
  ) {
    this.logger.log(
      `Received notification webhook for ${body.event.broadcaster_user_name}`,
    );

    res.sendStatus(204);

    const foundUser = await this.userDataService.getByTwitchId(userId, {
      categories: {
        items: true,
      },
      twitch_credentials: true,
    });

    foundUser.last_category = body.event.category_id;

    await this.userDataService.updateById(foundUser);

    // if (!foundUser || body.event.category_id === foundUser.last_category)
    //   return;

    this.switchCategoryRewards(body, foundUser.categories, foundUser);
  }

  private async processRevocationWebhook(userId: string, res: Response) {
    res.sendStatus(204);

    const foundUser = await this.userDataService.getByTwitchId(userId);

    if (!foundUser) return;

    this.logger.log(`Received revocation webhook for ${foundUser.twitch_name}`);

    foundUser.is_subscribed = false;

    await this.userDataService.updateById(foundUser);
  }

  private async processVerificationWebhook(
    userId: string,
    res: Response,
    body: TwitchEventSubChallengeData,
  ) {
    res.status(200).send(body.challenge);

    const foundUser = await this.userDataService.getByTwitchId(userId);

    this.logger.log(
      `Received verification webhook for ${foundUser.twitch_name}`,
    );

    foundUser.is_subscribed = true;

    await this.userDataService.updateById(foundUser);
  }

  private async switchCategoryRewards(
    body: TwitchEventSubChannelUpdateEventData,
    categories: CategoryEntity[],
    user: UserEntity,
  ) {
    const toUpdateMap = new Map<string, boolean>();

    const accessToken = decrypt(user.twitch_credentials.access_token);
    const tokenType = capitalizeFirstLetter(
      decrypt(user.twitch_credentials.token_type),
    );

    const userCustomRewards =
      await this.twitchUserApiService.getUserCustomRewards({
        twitchId: user.twitch_id,
        accessToken,
        tokenType,
      });

    const formdCustomRewards = new Map<string, { is_enabled }>();

    userCustomRewards.data.map((reward) => {
      formdCustomRewards.set(reward.id, { is_enabled: reward.is_enabled });
    });

    for (const category of categories) {
      for (const item of category.items) {
        const status = formdCustomRewards.get(item.twitch_reward_id);

        if (!status) continue;

        if (category.twitch_id === body.event.category_id) {
          if (!status.is_enabled) toUpdateMap.set(item.twitch_reward_id, true);
        } else {
          if (status.is_enabled) toUpdateMap.set(item.twitch_reward_id, false);
        }
      }
    }

    formdCustomRewards.clear();

    const toResolveAll = [];

    for (const [id, is_enabled] of toUpdateMap) {
      toResolveAll.push(
        this.twitchCustomRewardApiService.updateUserCustomReward({
          body: { is_enabled },
          accessToken,
          tokenType,
          rewardId: id,
          twitchId: user.twitch_id,
        }),
      );
    }

    await Promise.all(toResolveAll);
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
