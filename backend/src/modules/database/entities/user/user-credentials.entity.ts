import { EnhancedBaseEntity } from '@modules/database/entities/base/enhanced-base.entity';
import { UserEntity } from '@modules/database/entities/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'user_credential' })
export class UserCredentialsEntity extends EnhancedBaseEntity {
  @OneToOne(() => UserEntity, (user) => user.credentials, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  user: UserEntity;

  @Column()
  refreshToken: string;
}
