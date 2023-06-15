import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UserService } from '@modules/user/services/user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetTwitchUserCustomRewardsResponseDTO,
  GetUserByIdDTO,
} from '../dto/user-responses.dto';
import { GetUser } from '@common/decorators/getUser.decorator';
import { ParsedJwtUser } from '@modules/auth/types/auth-service.types';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
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
  public getUsersCustomRewards(
    @GetUser() user: ParsedJwtUser,
  ): Promise<GetTwitchUserCustomRewardsResponseDTO> {
    return this.userService.getUserCustomRewards(user);
  }
}
