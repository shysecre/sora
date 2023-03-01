import { EnhancedBaseEntity } from '@common/entities/base/enhanced-base.entity';
import { UserEntity } from '@common/entities/user/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class UserCredentionalsEntity extends EnhancedBaseEntity {
  @OneToOne(() => UserEntity, (user) => user.credentionals, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: UserEntity;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  tokenType: string;
}
