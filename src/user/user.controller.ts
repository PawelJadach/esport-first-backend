import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }
}
