import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

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
}
