import { CustomSuccessResponse } from './../interfaces/success';
import { EditUserDto } from './dto/edit-user.dto';
import { ErrorResponse } from '../interfaces/error';
import { UserRoleEnum } from './user.entity';
import { GetUsersResponse, GetUserResponse } from './../interfaces/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getAll(): Promise<GetUsersResponse> {
    return this.userService.getAll();
  }

  @Put('/:id/role')
  @UseGuards(AuthGuard('jwt'))
  changeRole(@Param('id') id: string, @Body('role') role: UserRoleEnum): Promise<CustomSuccessResponse> {
    return this.userService.changeRole(id, role);
  }

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() newUser: RegisterDto
  ): Promise<RegisterUserResponse | ErrorResponse> {
    return this.userService.register(newUser);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteOne(@Param('id') id: string): Promise<CustomSuccessResponse> {
    return this.userService.deleteOne(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() user: EditUserDto): Promise<GetUserResponse> {
    return this.userService.edit(id, user);
  }
}
