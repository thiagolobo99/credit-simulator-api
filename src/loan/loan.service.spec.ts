import { Test, TestingModule } from '@nestjs/testing';
import { LoanService, LoanSimulationResult } from './loan.service';
import { MailService } from './mail.service';
import { SimulateLoanDto } from './dto/simulate.loan.dto';
import { BadRequestException } from '@nestjs/common';

describe('LoanService', () => {
  let loanService: LoanService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: MailService,
          useValue: {
            sendSimulationToEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    loanService = module.get<LoanService>(LoanService);
    mailService = module.get<MailService>(MailService);
  });

  describe('simulateLoan', () => {
    it('Deve calcular a simulação de um empréstimo corretamente.', async () => {
      const simulateLoanDto: SimulateLoanDto = {
        loanAmount: 10000,
        birthDate: '1990-01-01',
        months: 12,
        email: process.env.EMAIL_USER,
      };

      const result: LoanSimulationResult =
        await loanService.simulateLoan(simulateLoanDto);

      expect(result.loanAmount).toBe('R$ 10.000,00');
      expect(result.monthlyPayment).toBeDefined();
      expect(result.totalAmount).toBeDefined();
      expect(result.totalInterest).toBeDefined();
      expect(result.interestRate).toBe('3.00% ao ano');

      // Verifica se o e-mail foi enviado
      expect(mailService.sendSimulationToEmail).toHaveBeenCalledWith(
        process.env.EMAIL_USER,
        expect.any(String), // O conteúdo do e-mail é verificado de forma genérica
      );
    });

    it('deve lançar uma exceção se o valor do empréstimo for menor ou igual a zero', async () => {
      const simulateLoanDto: SimulateLoanDto = {
        loanAmount: 0,
        birthDate: '1990-01-01',
        months: 12,
        email: process.env.EMAIL_USER,
      };

      await expect(loanService.simulateLoan(simulateLoanDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve calcular a taxa de juros corretamente baseada na idade', async () => {
      const simulateLoanDtoYoung: SimulateLoanDto = {
        loanAmount: 10000,
        birthDate: '2005-01-01',
        months: 12,
        email: process.env.EMAIL_USER,
      };

      const simulateLoanDtoMiddleAged: SimulateLoanDto = {
        loanAmount: 10000,
        birthDate: '1985-01-01',
        months: 12,
        email: process.env.EMAIL_USER,
      };

      const resultYoung = await loanService.simulateLoan(simulateLoanDtoYoung);
      const resultMiddleAged = await loanService.simulateLoan(
        simulateLoanDtoMiddleAged,
      );

      expect(resultYoung.interestRate).toBe('5.00% ao ano');
      expect(resultMiddleAged.interestRate).toBe('3.00% ao ano');
    });
  });

  describe('simulateMultipleLoans', () => {
    it('deve simular múltiplos empréstimos corretamente', async () => {
      const simulateLoanDtos: SimulateLoanDto[] = [
        {
          loanAmount: 5000,
          birthDate: '1990-01-01',
          months: 12,
          email: process.env.EMAIL_USER,
        },
        {
          loanAmount: 10000,
          birthDate: '1980-01-01',
          months: 24,
          email: process.env.EMAIL_USER,
        },
      ];

      const result: LoanSimulationResult[] =
        await loanService.simulateMultipleLoans(simulateLoanDtos);

      expect(result).toHaveLength(2);
      expect(result[0].loanAmount).toBe('R$ 5.000,00');
      expect(result[1].loanAmount).toBe('R$ 10.000,00');

      // Verifica se o email foi enviado para ambos os empréstimos
      expect(mailService.sendSimulationToEmail).toHaveBeenCalledTimes(2);
    });
  });
});
