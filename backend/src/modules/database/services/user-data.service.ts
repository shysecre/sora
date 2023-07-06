import { UserEntity } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsRelations } from 'typeorm';

@Injectable()
export class UserDataService {
  public getUserById(
    id: string,
    relations?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    return UserEntity.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  public getByTwitchId(
    id: string,
    relations?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    return UserEntity.findOne({
      where: {
        twitch_id: id,
      },
      relations,
    });
  }

  public create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    return UserEntity.create(data).save();
  }

  public updateById(entity: DeepPartial<UserEntity>) {
    return UserEntity.save(entity);
  }
}
