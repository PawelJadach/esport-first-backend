import { IsDefined, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from "../user.entity";

export class RegisterDto {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  pwd: string;

  @IsOptional()
  personId?: string;

  @IsOptional()
  role?: UserRoleEnum;
}
