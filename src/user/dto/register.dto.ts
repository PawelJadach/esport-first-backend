import { UserRoleEnum } from "../user.entity";

export class RegisterDto {
  email: string;
  pwd: string;
  personId?: string;
  role?: UserRoleEnum;
}
