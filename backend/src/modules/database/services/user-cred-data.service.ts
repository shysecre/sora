import { Injectable } from '@nestjs/common';
import { UserCredsCreateUpdateData } from '../types/user-creds-data.types';
import { UserCredentialsEntity } from '../entities';

@Injectable()
export class UserCredsDataService {
  public createCreds({ userId, refreshToken }: UserCredsCreateUpdateData) {
    return UserCredentialsEntity.create({
      user: {
        id: userId,
      },
      refresh_token: refreshToken,
    }).save();
  }

  public updateCreds({ userId, refreshToken }: UserCredsCreateUpdateData) {
    return UserCredentialsEntity.update(
      {
        user: {
          id: userId,
        },
      },
      {
        refresh_token: refreshToken,
      },
    );
  }

  public findCredsByUserId(userId: string) {
    return UserCredentialsEntity.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
