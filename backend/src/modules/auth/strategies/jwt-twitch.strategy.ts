import { EnvObject } from '@modules/app/types/app.types';
import { UserEntity } from '@modules/database/entities';
import { TwitchAuthService } from '@modules/twitch/services';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtTwitchStrategy extends PassportStrategy(
  Strategy,
  'jwt-twitch-strategy',
) {
  constructor(
    private configService: ConfigService<EnvObject, true>,
    private twitchAuthService: TwitchAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const user = await UserEntity.findOne({
      where: {
        id: payload.id,
      },
      relations: {
        twitch_credentials: true,
      },
    });

    const { isValid, tokens } =
      await this.twitchAuthService.validateTwitchAccessToken(user);

    if (!isValid) {
      throw new HttpException('invalid twitch token', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: payload.id,
      twitchId: user.twitch_id,
      creds: tokens,
    };
  }
}
