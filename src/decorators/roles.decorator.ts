import { UserRoleEnum } from './../user/user.entity';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);