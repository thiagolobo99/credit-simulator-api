import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanController } from './loan/loan.controller';
import { LoanService } from './loan/loan.service';
import { MailService } from './loan/mail.service';

@Module({
  imports: [],
  controllers: [AppController, LoanController],
  providers: [AppService, LoanService, MailService],
})
export class AppModule {}
