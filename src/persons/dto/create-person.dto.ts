import { IsNumber, IsOptional, IsString } from "class-validator";
import { PersonsGendersEnum } from "../persons.entity";

export class CreatePersonDto {
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
