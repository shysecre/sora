import { EnhancedBaseEntity } from '@modules/database/entities/base/enhanced-base.entity';
import { UserTwitchCredentialsEntity } from '@modules/database/entities/user/user-twitch-credentials.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserCredentialsEntity } from './user-credentials.entity';
import { CategoryEntity } from '../category/category.entity';
import { CategoryItemEntity } from '../category/category-item.entity';

@Entity({ name: 'user' })
export class UserEntity extends EnhancedBaseEntity {
  @OneToOne(
    () => UserTwitchCredentialsEntity,
    (credentials) => credentials.user,
    {
      cascade: true,
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  twitchCredentials: UserTwitchCredentialsEntity | null;

  @Column()
  twitchId: string;

  @Column()
  twitchImage: string;

  @Column()
  twitchName: string;

  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  credentials: UserCredentialsEntity;

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => CategoryItemEntity, (categoryItem) => categoryItem.user)
  categoryItems: CategoryItemEntity[];
}
