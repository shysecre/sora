import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities';
import { DeepPartial, In } from 'typeorm';

@Injectable()
export class LocalCategoryDataService {
  public createLocalCategory(items: DeepPartial<CategoryEntity>[]) {
    return CategoryEntity.save(CategoryEntity.create(items));
  }

  public getLocalCategoriesByTwitchIds(ids: string[]) {
    return CategoryEntity.find({
      where: {
        twitch_id: In(ids),
      },
    });
  }

  public getLocalCategoriesByUserId(userId: string) {
    return CategoryEntity.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        items: true,
      },
      order: {
        twitch_name: 'asc',
      },
    });
  }
}
