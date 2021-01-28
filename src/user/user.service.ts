import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { RegisterUserResponse } from '../interfaces/user';
import { hashPwd } from 'src/utils/hashPwd';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    if (await User.findOne({ email: newUser.email })) {
      throw new HttpException('This email is busy', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);

    await user.save();

    return this.filter(user);
  }
}
