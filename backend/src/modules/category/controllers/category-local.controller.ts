import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AddCustomRewardToLocalCategoryRequestDTO,
  CreateLocalCategoryItemRequestDTO,
  CreateLocalCategoryRequestDTO,
} from '../dto/category-requests.dto';
import { CategoryLocalService } from '../services/category-local.service';
import { GetUser } from '@common/decorators/get-user.decorator';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';

@Controller('local')
@UseGuards(JwtAuthGuard)
@ApiTags('Category Local')
export class CategoryControllerLocal {
  constructor(private categoryLocalService: CategoryLocalService) {}

  @Post('category')
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

  @Delete('item')
  @ApiOkResponse({ description: 'Remove category items from category' })
  public removeLocalCategoryItemsFromCategory(
    @Body() body: AddCustomRewardToLocalCategoryRequestDTO,
  ) {
    return this.categoryLocalService.removeLocalCategoryItemFromCategory(body);
  }

  @Get('categories')
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
    @GetUser() user: ParsedJwtUser,
  ) {
    return this.categoryLocalService.createLocalCategoryItem(user, body.items);
  }

  @Get('items')
  @ApiOkResponse({
    description: "Get all user's created custom category items",
  })
  public getLocalItems(@GetUser() user: ParsedJwtUser) {
    return this.categoryLocalService.getLocalItemsByUserId(user.id);
  }

  @Get('category/:category_id/items')
  @ApiOkResponse({
    description: 'Get all category items for provided category',
  })
  public getLocalCategoryItems(
    @Param('category_id') categoryId: string,
    @GetUser() user: ParsedJwtUser,
  ) {
    return this.categoryLocalService.getLocalCategoryItemsByCategoryId(
      user.id,
      categoryId,
    );
  }
}
