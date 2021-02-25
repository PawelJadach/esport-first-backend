import { IsDefined } from 'class-validator';
import { UserRoleEnum } from "../user.entity";

export class RegisterDto {
  @IsDefined()
  email: string;

  @IsDefined()
  pwd: string;

  @IsDefined()
  personId?: string;
  role?: UserRoleEnum;
}
