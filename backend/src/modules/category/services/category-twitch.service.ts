import { Injectable } from '@nestjs/common';
import { GetCategoriesByNameServiceOptions } from '../types/category-service.types';
import { TwitchCategoryApiService } from '@modules/twitch/services';

@Injectable()
export class CategoryTwitchService {
  constructor(private twitchCategoryiApiService: TwitchCategoryApiService) {}

  public getCategoriesByName(body: GetCategoriesByNameServiceOptions) {
    return this.twitchCategoryiApiService.getTwitchCategoriesByName(body);
  }
}
