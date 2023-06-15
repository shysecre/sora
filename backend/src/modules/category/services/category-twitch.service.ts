import { TwitchApiService } from '@modules/twitch/services/api/twitch-api.service';
import { Injectable } from '@nestjs/common';
import { GetCategoriesByNameServiceOptions } from '../types/category-service.types';

@Injectable()
export class CategoryTwitchService {
  constructor(private twitchApiService: TwitchApiService) {}

  public getCategoriesByName(body: GetCategoriesByNameServiceOptions) {
    return this.twitchApiService.getTwitchCategoriesByName(body);
  }
}
