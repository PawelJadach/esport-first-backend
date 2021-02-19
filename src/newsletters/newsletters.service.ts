import { Newsletter as NewsletterEntity } from './newsletter.entity';
import { Newsletter } from '../interfaces/newsletter';
import { AddToNewsletterDto } from './dto/add-to-newsletter.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CustomSuccessResponse } from 'src/interfaces/success';

@Injectable()
export class NewslettersService {

  async findById(id: string): Promise<NewsletterEntity> {
    const found = await NewsletterEntity.findOne(id);
    if (!found) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  async unsubscribe(id: string): Promise<string> {
    const found = await this.findById(id);
    found.isActive = false;

    await found.save();

    return '<h1>Pomyślnie usunięto z newslettera!</h1>'
  }

  async subscribe(id: string): Promise<string> {
    const found = await this.findById(id);
    found.isActive = true;

    await found.save();

    return '<h1>Pomyślnie zapisano do newslettera!</h1>'
  }

  async delete(id: string): Promise<CustomSuccessResponse> {
    const found = await this.findById(id);
    await found.remove();
    return { success: true };
  }

  async add(addToNewsletterDto: AddToNewsletterDto): Promise<CustomSuccessResponse> {
    const found = await NewsletterEntity.findOne({ email: addToNewsletterDto.email });

    if(found) {
      throw new HttpException('Email busy', HttpStatus.BAD_REQUEST);
    }

    const newsletter = new NewsletterEntity();
    newsletter.email = addToNewsletterDto.email;

    await newsletter.save();
    return { success: true };
  }

  async getAll(): Promise<Newsletter[]> {
    return await NewsletterEntity.find();
  }
}
