import { IsNotEmpty, IsString } from "class-validator";

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  personId?: string;
}
