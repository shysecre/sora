import { EnvObject } from '@modules/app/types/app.types';
import { UserEntity } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService<EnvObject, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string }) {
    const user = await UserEntity.findOne({
      where: { id: payload.id },
      select: {
        id: true,
        twitch_id: true,
      },
    });

    return {
      id: payload.id,
      twitchId: user.twitch_id,
    };
  }
}
