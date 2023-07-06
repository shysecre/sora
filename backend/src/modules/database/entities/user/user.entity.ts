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
  twitch_credentials: UserTwitchCredentialsEntity | null;

  @Column()
  twitch_id: string;

  @Column()
  twitch_image: string;

  @Column()
  twitch_name: string;

  @Column({ default: null })
  last_category: string | null;

  @Column({ default: false })
  is_subscribed: boolean;

  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  credentials: UserCredentialsEntity;

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => CategoryItemEntity, (categoryItem) => categoryItem.user)
  category_items: CategoryItemEntity[];
}
