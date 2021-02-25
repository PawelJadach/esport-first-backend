import { User } from "src/user/user.entity";

export interface News {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    photoUrl: string;
    user: User;
}
