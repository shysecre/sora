import { EnhancedBaseEntity } from '@modules/database/entities/base/enhanced-base.entity';
import { UserEntity } from '@modules/database/entities/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'user_twitch_credential' })
export class UserTwitchCredentialsEntity extends EnhancedBaseEntity {
  @OneToOne(() => UserEntity, (user) => user.twitch_credentials, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  user: UserEntity;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column()
  token_type: string;
}
