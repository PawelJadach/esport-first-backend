import { News } from './news.entity';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { User } from 'src/user/user.entity';
import { UserObj } from 'src/decorators/user-object.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createNewsDto: CreateNewsDto, @UserObj() user: User): Promise<News> {
    return this.newsService.create(createNewsDto, user);
  }

  @Get()
  findAll(): Promise<News[]> {
    return this.newsService.findAll(true);
  }

  @Get('/admin')
  @UseGuards(AuthGuard('jwt'))
  findAllAdmin(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
