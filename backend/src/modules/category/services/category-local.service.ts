import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AddCustomRewardToLocalCategoryServiceOptions,
  CreateLocalCategoryServiceOptions,
} from '../types/category-service.types';
import { LocalCategoryDataService } from '@modules/database/services/category-data.service';
import { LocalCategoryItemDataService } from '@modules/database/services/category-local-item-data.service';
import { CategoryItemEntity } from '@modules/database/entities';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CategoryLocalService {
  constructor(
    private categoryDataService: LocalCategoryDataService,
    private categoryLocalItemDataService: LocalCategoryItemDataService,
  ) {}

  public createLocalCategory(body: CreateLocalCategoryServiceOptions) {
    return this.categoryDataService.createLocalCategory(body);
  }

  public getLocalCategoriesByUserId(userId: string) {
    return this.categoryDataService.getLocalCategoriesByUserId(userId);
  }

  public async addCategoryItemToLocalCategory({
    categoryIds,
    categoryItemIds,
  }: AddCustomRewardToLocalCategoryServiceOptions) {
    try {
      const toUpdate: DeepPartial<CategoryItemEntity>[] = categoryItemIds.map(
        (id) => {
          return { id, categories: categoryIds.map((test) => ({ id: test })) };
        },
      );

      await CategoryItemEntity.save(toUpdate);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Unknown error occure when trying to set category id to local items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public createLocalCategoryItem(twitchRewardId: string) {
    return this.categoryLocalItemDataService.createLocalCategoryItem(
      twitchRewardId,
    );
  }
}
