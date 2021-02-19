import { MailerModule, MailerService } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import mailerconfig = require('../config/mailerconfig');

@Module({
    imports: [
        MailerModule.forRoot(mailerconfig),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
