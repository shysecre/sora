import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { EnhancedBaseEntity } from '../base/enhanced-base.entity';
import { UserEntity } from '../user/user.entity';
import { CategoryItemEntity } from './category-item.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends EnhancedBaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.categories, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: UserEntity;

  @ManyToMany(
    () => CategoryItemEntity,
    (categoryItem) => categoryItem.categories,
  )
  items: CategoryItemEntity[];

  @Column()
  twitchId: string;

  @Column()
  twitchName: string;

  @Column()
  twitchBoxImage: string;
}
