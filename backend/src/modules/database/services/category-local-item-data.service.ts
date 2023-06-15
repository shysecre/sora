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

  public createLocalCategoryItem(twitchRewardId: string) {
    return CategoryItemEntity.create({ twitchRewardId }).save();
  }
}
