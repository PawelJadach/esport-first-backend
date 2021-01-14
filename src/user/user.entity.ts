import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoleEnum {
    ADMIN,
    MODERATOR,
}
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    pwdHash: string;

    @Column({ nullable: true, default: null })
    currentTokenId: string | null;

    @Column({
        default: UserRoleEnum.MODERATOR,
    })
    role: UserRoleEnum;
}
