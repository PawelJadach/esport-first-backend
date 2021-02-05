import { UserRoleEnum } from './../user/user.entity';
export interface RegisterUserResponse {
  id: string;
  email: string;
  role: UserRoleEnum;
}

export interface CustomUserResponse {
  success: boolean;
}

export interface GetUserResponse {
  id: string;
  email: string;
  role: UserRoleEnum;
}

export type GetUsersResponse = Array<GetUserResponse>;
