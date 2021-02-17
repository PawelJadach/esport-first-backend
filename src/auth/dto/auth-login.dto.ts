import { IsDefined } from "class-validator";

export class AuthLoginDto {
  @IsDefined()
  email: string;

  @IsDefined()
  pwd: string;
}
