import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EnhancedBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
