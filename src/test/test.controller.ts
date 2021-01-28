import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-object.decorator';
import { User } from 'src/user/user.entity';

@Controller('test')
export class TestController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@UserObj() user: User) {
    console.log(user);
    return {
      status: 'ok',
    };
  }
}
