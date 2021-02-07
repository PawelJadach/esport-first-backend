import { EditUserDto } from './dto/edit-user.dto';
import { ErrorResponse } from './../interfaces/error';
import { CustomUserResponse, GetUsersResponse, GetUserResponse } from './../interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User, UserRoleEnum } from './user.entity';
import { RegisterUserResponse } from '../interfaces/user';
import { hashPwd } from '../utils/hashPwd';
import { Persons } from '../persons/persons.entity';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      person: user.person,
    };
  }

  private async findById(id: string): Promise<User> {
    const user = await User.findOne(id, { relations: ['person'] });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getAll(): Promise<GetUsersResponse> {
    const users = await User.find({ relations: ['person']});

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

    if(newUser.personId) {
      const person = await Persons.findOne(newUser.personId)
      user.person = person;

      await user.save();
    }

    return this.filter(user);
  }

  async deleteOne(id: string): Promise<CustomUserResponse> {
    const user = await this.findById(id);

    await user.remove();

    return { success: true };
  }

  async edit(id: string, newUser: EditUserDto): Promise<GetUserResponse> {
    const user = await this.findById(id);
    for (const key in newUser) {
      if(key === "personId") {
        if(newUser.personId === "") {
          user.person = null;
        } else {
          const person = await Persons.findOne(newUser.personId)
          user.person = person;
        }
      } else {
        user[key] = newUser[key]
      }
    }
    const changedUser = await user.save();

    return this.filter(changedUser);
  }

  async changeRole(
    id: string,
    role: UserRoleEnum
  ): Promise<CustomUserResponse> {
    const user = await this.findById(id);

    user.role = role;

    await user.save();

    return { success: true };
  }
}
