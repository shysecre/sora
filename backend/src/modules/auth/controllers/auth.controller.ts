import { ProcessAuthDTO } from '@modules/twitch/dto/auth-requests.dto';
import {
  GetAuthLinkResponseDTO,
  ProcessAuthResponseDTO,
} from '@modules/twitch/dto/auth-responses.dto';
import { TwitchAuthService } from '@modules/twitch/services';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private twitchAuthService: TwitchAuthService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Return auth link that user must be redirected to',
    type: GetAuthLinkResponseDTO,
  })
  public getAuthLink(@Query() query: { lng: string }): GetAuthLinkResponseDTO {
    return this.twitchAuthService.getAuthLink(query.lng);
  }

  @Get('success')
  @ApiOkResponse({
    description:
      'Process provided code and auth user in system returning access & refresh tokens',
    type: ProcessAuthResponseDTO,
  })
  public processAuth(
    @Query() query: ProcessAuthDTO,
  ): Promise<ProcessAuthResponseDTO> {
    return this.twitchAuthService.processAuth(query);
  }

  @Get('refresh')
  @ApiOkResponse({
    description: 'Return refresh access token with new refresh token',
  })
  @UseGuards(JwtRefreshAuthGuard)
  public refreshAccessToken(@Req() request: Request) {
    return this.authService.refreshAccessToken(
      request.user['id'],
      request.user['refreshToken'],
    );
  }

  @Get('verify')
  @ApiOkResponse({
    description:
      'Return boolean value that determines if provided token is expired or not',
  })
  public async verifyToken(@Query('token') token: string) {
    try {
      await this.authService.verifyToken(token);

      return { isExpired: false };
    } catch (err) {
      return { isExpired: true };
    }
  }
}
