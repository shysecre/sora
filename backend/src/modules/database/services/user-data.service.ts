import { UserEntity } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsRelations, FindOptionsSelect } from 'typeorm';

@Injectable()
export class UserDataService {
  public getUserById(
    id: string,
    options?: {
      relations?: FindOptionsRelations<UserEntity>;
      select?: FindOptionsSelect<UserEntity>;
    },
  ): Promise<UserEntity> {
    return UserEntity.findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  public getByTwitchId(
    id: string,
    options?: {
      relations?: FindOptionsRelations<UserEntity>;
      select?: FindOptionsSelect<UserEntity>;
    },
  ): Promise<UserEntity> {
    return UserEntity.findOne({
      where: {
        twitch_id: id,
      },
      ...options,
    });
  }

  public create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    return UserEntity.create(data).save();
  }

  public updateById(entity: DeepPartial<UserEntity>) {
    return UserEntity.save(entity);
  }
}
