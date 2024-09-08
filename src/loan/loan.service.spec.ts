import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { BadRequestException } from '@nestjs/common';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate the loan correctly', () => {
    const simulateLoanDto = {
      loanAmount: 10000,
      birthDate: '1995-07-20',
      months: 24,
    };

    const result = service.simulateLoan(simulateLoanDto);

    expect(result.loanAmount.replace(/\s/g, '')).toBe(
      'R$10.000,00'.replace(/\s/g, ''),
    );
    expect(result.monthlyPayment).toBeDefined();
    expect(result.totalAmount).toBeDefined();
    expect(result.totalInterest).toBeDefined();
    expect(result.interestRate).toBe('3.00% ao ano');
  });

  it('should throw BadRequestException if loan amount is less than or equal to 0', () => {
    const simulateLoanDto = {
      loanAmount: 0,
      birthDate: '1995-07-20',
      months: 24,
    };

    expect(() => service.simulateLoan(simulateLoanDto)).toThrow(
      BadRequestException,
    );
  });

  it('should calculate the correct interest rate for different age groups', () => {
    const age25 = (service as any).getInterestRateByAge(25);
    const age30 = (service as any).getInterestRateByAge(30);
    const age50 = (service as any).getInterestRateByAge(50);
    const age65 = (service as any).getInterestRateByAge(65);

    expect(age25).toBe(5);
    expect(age30).toBe(3);
    expect(age50).toBe(2);
    expect(age65).toBe(4);
  });
});
