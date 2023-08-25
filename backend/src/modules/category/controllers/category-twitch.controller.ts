import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryTwitchService } from '../services/category-twitch.service';
import { GetTwitchCategoriesByNameRequestDTO } from '../dto/category-requests.dto';
import { GetTwitchCategoriesByNameResponseDTO } from '../dto/category-responses.dto';
import { GetUser } from '@common/decorators/get-user.decorator';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';
import { getCreds } from '@common/utils/get-user-creds-for-request.util';
import { JwtTwitchGuard } from '@modules/auth/guards/jwt-twitch.guard';

@Controller('twitch')
@ApiTags('Category Twitch')
export class CategoryControllerTwitch {
  constructor(private categoryTwitchService: CategoryTwitchService) {}

  @Get('categories')
  @ApiOkResponse({
    description: 'Return list of matching categories by provided name',
    type: GetTwitchCategoriesByNameResponseDTO,
  })
  @UseGuards(JwtTwitchGuard)
  public getCategoriesByName(
    @GetUser() user: ParsedJwtUser,
    @Query() query: GetTwitchCategoriesByNameRequestDTO,
  ): Promise<GetTwitchCategoriesByNameResponseDTO> {
    return this.categoryTwitchService.getCategoriesByName({
      name: query.name,
      cursor: query.cursor,
      ...getCreds(user),
    });
  }
}
