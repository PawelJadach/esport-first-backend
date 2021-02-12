import { CustomSuccessResponse } from './../interfaces/success';
import { EditUserDto } from './dto/edit-user.dto';
import { ErrorResponse } from '../interfaces/error';
import { GetUsersResponse, GetUserResponse } from '../interfaces/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User, UserRoleEnum } from './user.entity';
import { RegisterUserResponse } from '../interfaces/user';
import { hashPwd } from '../utils/hashPwd';
import { Persons } from '../persons/persons.entity';
import { Command, Console } from 'nestjs-console';

@Injectable()
@Console({
  name: 'admin'
})
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
    console.log(newUser.hasOwnProperty('role'));
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);
    user.role = newUser.hasOwnProperty('role') ? newUser.role : UserRoleEnum.MODERATOR;

    await user.save();

    if(newUser.personId) {
      const person = await Persons.findOne(newUser.personId)
      user.person = person;

      await user.save();
    }

    return this.filter(user);
  }

  async deleteOne(id: string): Promise<CustomSuccessResponse> {
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
  ): Promise<CustomSuccessResponse> {
    const user = await this.findById(id);

    user.role = role;

    await user.save();

    return { success: true };
  }

  @Command({
    command: 'add <email> <pwd>',
    description: 'Add new admin'
  })
  async addAdminCmd(email: string, pwd: string) {
    const res = await this.register({ email, pwd, role: UserRoleEnum.ADMIN });

    if(res.hasOwnProperty('error')) {
      console.log();
      console.log("\x1b[31m", `User with this email is defined`);
      console.log("\x1b[37m");
    } else {
      console.log();
      console.log('ADMIN ADDED');
      console.log("\x1b[35m", `Email: ${email}`);
      console.info("\x1b[35m", `Password: ${pwd}`);
      console.log("\x1b[37m");
    }
  }
}
