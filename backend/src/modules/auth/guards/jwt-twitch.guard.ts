import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtTwitchGuard extends AuthGuard('jwt-twitch-strategy') {}
