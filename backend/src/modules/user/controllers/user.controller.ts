import { UserService } from '@modules/user/services/user.service';
import { Controller, Get, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetTwitchUserCustomRewardsResponseDTO,
  GetUserByIdDTO,
} from '../dto/user-responses.dto';
import { GetUser } from '@common/decorators/get-user.decorator';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';
import { JwtTwitchGuard } from '@modules/auth/guards/jwt-twitch.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @SerializeOptions({ type: GetUserByIdDTO })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Return user object',
    type: GetUserByIdDTO,
  })
  public getUser(@GetUser() user: ParsedJwtUser): Promise<GetUserByIdDTO> {
    return this.userService.getUserById(user.id);
  }

  @Get('custom-rewards')
  @ApiOkResponse({
    description: "Return all user's custom rewards",
    type: GetTwitchUserCustomRewardsResponseDTO,
  })
  @UseGuards(JwtTwitchGuard)
  public getUsersCustomRewards(
    @GetUser() user: ParsedJwtUser,
  ): Promise<GetTwitchUserCustomRewardsResponseDTO> {
    return this.userService.getUserCustomRewards(user);
  }
}
