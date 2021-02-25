import { User } from './../user/user.entity';
import { Type } from 'class-transformer';
import { BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Entity } from 'typeorm';

@Entity()
export class News extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Type(() => Date)
    @Column()
    createdAt: Date;

    @Column()
    photoUrl: string;

    @Column({ default: false })
    isPublic: boolean;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}
