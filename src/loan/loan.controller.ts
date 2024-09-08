import { Controller, Post, Body } from '@nestjs/common';
import { LoanService, LoanSimulationResult } from './loan.service';
import { SimulateLoanDto } from './dto/simulate.loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('simulate')
  simulateLoan(@Body() simulateLoanDto: SimulateLoanDto): LoanSimulationResult {
    return this.loanService.simulateLoan(simulateLoanDto);
  }
}
