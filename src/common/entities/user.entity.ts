import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Token } from './token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  username: string;

  @Column()
  name: string;

  @Column({
    length: 10,
  })
  npm: string;

  @Column()
  faculty: string;

  @Column()
  study_program: string;

  @Column()
  educational_program: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
