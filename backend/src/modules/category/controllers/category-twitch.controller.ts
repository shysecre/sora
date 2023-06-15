import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryTwitchService } from '../services/category-twitch.service';
import { GetTwitchCategoriesByNameRequestDTO } from '../dto/category-requests.dto';
import { GetTwitchCategoriesByNameResponseDTO } from '../dto/category-responses.dto';

@Controller('twitch/category')
@UseGuards(JwtAuthGuard)
@ApiTags('Category Twitch')
export class CategoryControllerTwitch {
  constructor(private categoryTwitchService: CategoryTwitchService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return list of matching categories by provided name',
    type: GetTwitchCategoriesByNameResponseDTO,
  })
  public getCategoriesByName(
    @Req() req,
    @Query() query: GetTwitchCategoriesByNameRequestDTO,
  ): Promise<GetTwitchCategoriesByNameResponseDTO> {
    return this.categoryTwitchService.getCategoriesByName({
      name: query.name,
      cursor: query.cursor,
      accessToken: req.user.creds.accessToken,
      tokenType: req.user.creds.tokenType,
    });
  }
}
