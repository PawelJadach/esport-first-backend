import { CustomSuccessResponse } from './../interfaces/success';
import { News } from './news.entity';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  async create(createNewsDto: CreateNewsDto, user: User): Promise<News> {
    const { photoUrl, content, title } = createNewsDto;
    const news = new News();
    news.createdAt = new Date();
    news.photoUrl = photoUrl;
    news.content = content;
    news.title = title;
    news.user = user;

    return await news.save();
  }

  async findAll(isPublic: boolean = false): Promise<News[]> {

    return await News.find({ isPublic: isPublic })
  }

  findOne(id: string) {
    return `This action returns a #${id} news`;
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: string) {
    return `This action removes a #${id} news`;
  }
}
