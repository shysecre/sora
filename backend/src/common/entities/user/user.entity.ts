import { EnhancedBaseEntity } from '@common/entities/base/enhanced-base.entity';
import { UserCredentionalsEntity } from '@common/entities/user/user-credentionals.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class UserEntity extends EnhancedBaseEntity {
  @OneToOne(
    () => UserCredentionalsEntity,
    (credentionals) => credentionals.user,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  credentionals: UserCredentionalsEntity | null;
}
