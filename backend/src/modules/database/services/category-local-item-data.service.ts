import { Injectable } from '@nestjs/common';
import { CategoryItemEntity } from '../entities';

@Injectable()
export class LocalCategoryItemDataService {
  public setLocalCategoryItemToCategory(
    categoryIds: { id: string }[],
    categoryItemIds: string[],
  ) {
    return CategoryItemEntity.createQueryBuilder()
      .update()
      .set({ categories: categoryIds })
      .where('id IN (:...id)', { id: categoryItemIds })
      .execute();
  }

  public getLocalItemsByUserId(userId: string) {
    return CategoryItemEntity.find({ where: { user: { id: userId } } });
  }

  public getLocalCategoryItemsByCategoryId(userId: string, categoryId: string) {
    return CategoryItemEntity.find({
      where: {
        user: {
          id: userId,
        },
        categories: { id: categoryId },
      },
    });
  }

  public createLocalCategoryItem(userId: string, twitchRewardId: string) {
    return CategoryItemEntity.create({
      user: {
        id: userId,
      },
      twitch_reward_id: twitchRewardId,
    }).save();
  }
}
