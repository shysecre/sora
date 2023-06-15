import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AddCustomRewardToLocalCategoryRequestDTO,
  CreateLocalCategoryItemRequestDTO,
  CreateLocalCategoryRequestDTO,
} from '../dto/category-requests.dto';
import { CategoryLocalService } from '../services/category-local.service';
import { GetUser } from '@common/decorators/getUser.decorator';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';

@Controller('local/category')
@UseGuards(JwtAuthGuard)
@ApiTags('Category Local')
export class CategoryControllerLocal {
  constructor(private categoryLocalService: CategoryLocalService) {}

  @Post()
  @ApiOkResponse({ description: 'Create new local category for user' })
  public createLocalCategory(
    @GetUser() user: ParsedJwtUser,
    @Body() body: CreateLocalCategoryRequestDTO,
  ) {
    return this.categoryLocalService.createLocalCategory({
      userId: user.id,
      ...body,
    });
  }

  @Patch('item')
  @ApiOkResponse({ description: 'Set local category to local category items' })
  public addLocalCategoryItemsToCategory(
    @Body() body: AddCustomRewardToLocalCategoryRequestDTO,
  ) {
    return this.categoryLocalService.addCategoryItemToLocalCategory(body);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all local categories created by user',
  })
  public getLocalCategoriesByUserId(@GetUser() user: ParsedJwtUser) {
    return this.categoryLocalService.getLocalCategoriesByUserId(user.id);
  }

  @Post('item')
  @ApiOkResponse({
    description: 'Create category item',
  })
  public createLocalCategoryItem(
    @Body() body: CreateLocalCategoryItemRequestDTO,
  ) {
    return this.categoryLocalService.createLocalCategoryItem(body.test);
  }
}
