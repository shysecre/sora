import { LocalCategoryItemDataService } from '@modules/database/services/category-local-item-data.service';
import { UserTwitchCredsDataService } from '@modules/database/services/user-twitch-creds-data.service';
import { fomdCredentials } from '@modules/twitch/utils/form-credentionals.util';
import { UserDataService } from '@modules/database/services/user-data.service';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  TwitchAuthApiService,
  TwitchUserApiService,
} from '@modules/twitch/services';
import { CategoryItemEntity } from '@modules/database/entities';

@Injectable()
export class UserService {
  constructor(
    private userDataService: UserDataService,
    private twitchUserApiService: TwitchUserApiService,
    private twitchAuthApiService: TwitchAuthApiService,
    private userTwitchCredsDataService: UserTwitchCredsDataService,
    private localCategoryItemDataService: LocalCategoryItemDataService,
  ) {}

  public async getUserById(id: string) {
    const foundUser = await this.userDataService.getUserById(id, {
      select: {
        id: true,
        twitch_id: true,
        twitch_name: true,
        twitch_image: true,
      },
    });

    if (!foundUser)
      throw new HttpException(
        'User with provided ID was not found',
        HttpStatus.NOT_FOUND,
      );

    return foundUser;
  }

  public async getUserCustomRewards({ id, twitchId, creds }: ParsedJwtUser) {
    try {
      const response = { data: [] };

      const [allRewards, managableRewards, localRewards] = await Promise.all([
        this.twitchUserApiService.getUserCustomRewards({
          twitchId,
          ...creds,
        }),
        this.twitchUserApiService.getUserCustomRewards({
          only_manageable_rewards: true,
          twitchId,
          ...creds,
        }),
        this.localCategoryItemDataService.getLocalItemsByUserId(id),
      ]);

      const allRewardsMap = allRewards.data.reduce((accum, reward) => {
        accum.set(reward.id, reward);

        return accum;
      }, new Map());

      const managableRewardsMap = managableRewards.data.reduce(
        (accum, reward) => {
          accum.set(reward.id, reward);

          return accum;
        },
        new Map(),
      );

      const localRewardsMap: Map<string, CategoryItemEntity> =
        localRewards.reduce((accum, reward) => {
          accum.set(reward.twitch_reward_id, reward);

          return accum;
        }, new Map());

      for (const [id, body] of allRewardsMap) {
        const inManagebleRewardMap = managableRewardsMap.has(id);

        if (!inManagebleRewardMap) {
          response.data.push({ ...body, isTwitchReward: true });

          continue;
        }

        const inLocalRewardMap = localRewardsMap.has(id);

        if (!inLocalRewardMap) {
          response.data.push({ ...body, isManagebleReward: true });

          continue;
        }

        const inLocalRewardElement = localRewardsMap.get(id);

        response.data.push({
          ...body,
          isLocalReward: true,
          local_id: inLocalRewardElement.id,
        });
      }

      response.data.sort((a, b) => a.cost - b.cost);

      return response;
    } catch (err) {
      if (err.response.status !== 401)
        throw new HttpException(
          'Something bad happened',
          HttpStatus.BAD_REQUEST,
        );

      const refreshedTokens =
        await this.twitchAuthApiService.refreshUserAccessToken(
          creds.refreshToken,
        );

      await this.userTwitchCredsDataService.updateByUserId({
        userId: id,
        twitchCredentials: fomdCredentials(refreshedTokens),
      });
    }
  }
}
