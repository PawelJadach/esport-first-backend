import { PersonsGendersEnum } from "../persons.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePersonDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @IsOptional()
  nick?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsOptional()
  @IsNumber()
  gender?: PersonsGendersEnum;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  role: string;
}
