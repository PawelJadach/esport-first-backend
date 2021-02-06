import { PersonsGendersEnum } from "../persons.entity";

export class CreatePersonDto {
  name: string;
  surname: string;
  nick?: string;
  age?: number;
  gender?: PersonsGendersEnum;
  photoUrl?: string;
  role: string;
}
