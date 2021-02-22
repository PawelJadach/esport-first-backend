import { MailModule } from './../mail/mail.module';
import { forwardRef, Module } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { NewslettersController } from './newsletters.controller';

@Module({
  controllers: [NewslettersController],
  providers: [NewslettersService],
  imports: [
    forwardRef(() => MailModule)
  ],
})
export class NewslettersModule {}
