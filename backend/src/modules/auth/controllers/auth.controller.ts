import { GetAuthLinkResponseDTO } from '@modules/auth/dto/auth-responses.dto';
import { AuthService } from '@modules/auth/services/auth.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return auth link that frontend must use to redirect user to',
  })
  getAuthLink(): GetAuthLinkResponseDTO {
    return this.authService.getAuthLink();
  }
}
