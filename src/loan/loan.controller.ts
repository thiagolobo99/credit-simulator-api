import { Controller, Post, Body } from '@nestjs/common';
import { LoanService, LoanSimulationResult } from './loan.service';
import { SimulateLoanDto } from './dto/simulate.loan.dto';
import { MultipleSimulateLoanDto } from './dto/multipleSimulate.loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('simulate')
  async simulateLoan(
    @Body() simulateLoanDto: SimulateLoanDto,
  ): Promise<LoanSimulationResult> {
    return await this.loanService.simulateLoan(simulateLoanDto);
  }

  @Post('simulate-multiple')
  async simulateMultipleLoans(
    @Body() multipleSimulateLoanDto: MultipleSimulateLoanDto,
  ): Promise<LoanSimulationResult[]> {
    return await this.loanService.simulateMultipleLoans(
      multipleSimulateLoanDto.simulations,
    );
  }
}
