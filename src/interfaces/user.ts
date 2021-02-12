import { Persons } from '../persons/persons.entity';
import { UserRoleEnum } from './../user/user.entity';
export interface RegisterUserResponse {
  id: string;
  email: string;
  role: UserRoleEnum;
  person: Persons;
}

export interface GetUserResponse {
  id: string;
  email: string;
  role: UserRoleEnum;
  person: Persons;
}

export type GetUsersResponse = Array<GetUserResponse>;
