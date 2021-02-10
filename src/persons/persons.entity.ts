import { User } from '../user/user.entity';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PersonsGendersEnum {
  MALE,
  FEMALE,
  NOTSPECIFIED,
}

@Entity()
export class Persons extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column()
  age: number;

  @Column({ nullable: true, default: null })
  nick: string | null;

  @Column({ default: PersonsGendersEnum.NOTSPECIFIED })
  gender: PersonsGendersEnum;

  @Column({ nullable: true, default: null })
  photoUrl: string | null;

  @Column({ nullable: true, default: null })
  role: string | null;

  @OneToOne(type => User)
  user: User;
}
