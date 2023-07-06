import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocalCategoryServiceOptions } from '../types/category-service.types';
import { LocalCategoryDataService } from '@modules/database/services/category-data.service';
import { LocalCategoryItemDataService } from '@modules/database/services/category-local-item-data.service';
import { CategoryItemEntity } from '@modules/database/entities';
import { DeepPartial } from 'typeorm';
import { AddCustomRewardToLocalCategoryRequestDTO } from '../dto/category-requests.dto';

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

  public async removeLocalCategoryItemFromCategory({
    categoryItems,
  }: AddCustomRewardToLocalCategoryRequestDTO) {
    try {
      const accumulator: { [k: string]: { [k: string]: null } } = {};

      const foundLocalItems = await CategoryItemEntity.find({
        where: categoryItems.map((element) => {
          element.categoryIds.map((categoryId) =>
            accumulator[element.categoryItemId]
              ? accumulator[element.categoryItemId][categoryId]
              : (accumulator[element.categoryItemId] = {
                  [categoryId]: undefined,
                }),
          );

          return { id: element.categoryItemId };
        }),
        relations: {
          categories: true,
        },
        select: {
          id: true,
          categories: {
            id: true,
          },
        },
      });

      const toUpdate: DeepPartial<CategoryItemEntity>[] = foundLocalItems.map(
        (item) => ({
          ...item,
          categories: item.categories.filter(
            (category) => !!accumulator[item.id][category.id],
          ),
        }),
      );

      await CategoryItemEntity.save(toUpdate);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Unknown error occure when trying to remove category item from category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async addCategoryItemToLocalCategory({
    categoryItems,
  }: AddCustomRewardToLocalCategoryRequestDTO) {
    try {
      const toUpdate: DeepPartial<CategoryItemEntity>[] = categoryItems.map(
        (element) => ({
          id: element.categoryItemId,
          categories: element.categoryIds.map((element) => ({ id: element })),
        }),
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

  public createLocalCategoryItem(userId: string, twitchRewardId: string) {
    return this.categoryLocalItemDataService.createLocalCategoryItem(
      userId,
      twitchRewardId,
    );
  }

  public getLocalItemsByUserId(userId: string) {
    return this.categoryLocalItemDataService.getLocalItemsByUserId(userId);
  }

  public getLocalCategoryItemsByCategoryId(userId: string, categoryId: string) {
    return this.categoryLocalItemDataService.getLocalCategoryItemsByCategoryId(
      userId,
      categoryId,
    );
  }
}
