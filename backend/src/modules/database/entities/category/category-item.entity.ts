import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { EnhancedBaseEntity } from '../base/enhanced-base.entity';
import { CategoryEntity } from './category.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'category_item' })
export class CategoryItemEntity extends EnhancedBaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.category_items, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: UserEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.items, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable({
    name: 'category_and_item',
    joinColumn: {
      name: 'item_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];

  @Column()
  twitch_reward_id: string;
}
