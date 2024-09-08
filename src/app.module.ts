import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanController } from './loan/loan.controller';
import { LoanService } from './loan/loan.service';

@Module({
  imports: [],
  controllers: [AppController, LoanController],
  providers: [AppService, LoanService],
})
export class AppModule {}
