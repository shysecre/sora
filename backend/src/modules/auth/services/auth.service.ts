import { UserCredsDataService } from '@modules/database/services/user-cred-data.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceCreateTokensReturn } from '../types/auth-service.types';
import { compareHash, hash } from '@common/utils/hashes.util';
import { ConfigService } from '@nestjs/config';
import { EnvObject } from '@modules/app/types/app.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userCredsDataService: UserCredsDataService,
    private configService: ConfigService<EnvObject, true>,
  ) {}

  public async refreshAccessToken(
    userId: string,
    refreshToken: string,
  ): Promise<AuthServiceCreateTokensReturn> {
    const usersCreds = await this.userCredsDataService.findCredsByUserId(
      userId,
    );

    if (!usersCreds) {
      throw new HttpException(
        'Credentionals with provide user id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!compareHash(refreshToken, usersCreds.refresh_token)) {
      throw new HttpException(
        'Refresh tokens not the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = this.createTokens(userId);
    const hashedRefreshToken = hash(tokens.refreshToken);

    await this.updateRefreshToken(userId, hashedRefreshToken);

    return tokens;
  }

  public createTokens(userId: string): AuthServiceCreateTokensReturn {
    const accessToken = this.jwtService.sign(
      {
        id: userId,
      },
      {
        expiresIn: '90m',
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: userId,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  public updateRefreshToken(userId: string, refreshToken: string) {
    return this.userCredsDataService.updateCreds({
      userId,
      refreshToken,
    });
  }

  public saveRefreshToken(userId: string, refreshToken: string) {
    return this.userCredsDataService.createCreds({
      userId,
      refreshToken,
    });
  }
}
