import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities';
import { DeepPartial } from 'typeorm';

@Injectable()
export class LocalCategoryDataService {
  public createLocalCategory(items: DeepPartial<CategoryEntity>[]) {
    return CategoryEntity.save(CategoryEntity.create(items));
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
