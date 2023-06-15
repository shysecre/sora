import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities';
import { CategoryDataCreateLocalCategoryOptions } from '../types/category-data.types';

@Injectable()
export class LocalCategoryDataService {
  public createLocalCategory({
    userId,
    twitchId,
    twitchBoxImage,
    twitchName,
  }: CategoryDataCreateLocalCategoryOptions) {
    return CategoryEntity.create({
      user: {
        id: userId,
      },
      twitchId,
      twitchName,
      twitchBoxImage,
    }).save();
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
    });
  }
}
