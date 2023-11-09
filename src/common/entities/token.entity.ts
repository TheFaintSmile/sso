import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { TokenStatus } from '../enums';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @Column()
  token: string;

  @Column({
    type: 'enum',
    enum: TokenStatus,
  })
  status: TokenStatus;
}
