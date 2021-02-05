import { ErrorResponse } from './../interfaces/error';
import {
  CustomUserResponse,
  GetUserResponse,
  GetUsersResponse,
} from './../interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User, UserRoleEnum } from './user.entity';
import { RegisterUserResponse } from '../interfaces/user';
import { hashPwd } from 'src/utils/hashPwd';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  private async findById(id: string): Promise<User> {
    const user = await User.findOne(id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getAll(): Promise<GetUsersResponse> {
    const [users] = await User.findAndCount();

    return users.map(this.filter);
  }

  async register(
    newUser: RegisterDto
  ): Promise<RegisterUserResponse | ErrorResponse> {
    if (await User.findOne({ email: newUser.email })) {
      return { error: 'Email busy' };
    }

    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);

    await user.save();

    return this.filter(user);
  }

  async deleteOne(id: string): Promise<CustomUserResponse> {
    const user = await this.findById(id);

    await user.remove();

    return { success: true };
  }

  async changeRole(
    id: string,
    role: UserRoleEnum
  ): Promise<CustomUserResponse> {
    const user = await this.findById(id);

    user.role = role;
    console.log(user);
    await user.save();

    return { success: true };
  }
}
