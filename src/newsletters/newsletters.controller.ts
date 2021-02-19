import { AuthGuard } from '@nestjs/passport';
import { Newsletter } from '../interfaces/newsletter';
import { AddToNewsletterDto } from './dto/add-to-newsletter.dto';
import { Controller, Post, Body, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { CustomSuccessResponse } from 'src/interfaces/success';

@Controller('newsletters')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getAll(): Promise<Newsletter[]> {
    return this.newslettersService.getAll();
  }

  @Post('/add')
  add(@Body() createNewsletterDto: AddToNewsletterDto): Promise<CustomSuccessResponse> {
    return this.newslettersService.add(createNewsletterDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<CustomSuccessResponse> {
    return this.newslettersService.delete(id);
  }

  @Get('/subscribe/:id')
  subscribe(@Param('id') id: string): Promise<string> {
    return this.newslettersService.subscribe(id);
  }

  @Get('/unsubscribe/:id')
  unsubscribe(@Param('id') id: string): Promise<string> {
    return this.newslettersService.unsubscribe(id);
  }
}
