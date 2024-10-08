import { Injectable, BadRequestException } from '@nestjs/common';
import { SimulateLoanDto } from './dto/simulate.loan.dto';
import { MailService } from './mail.service';

export interface LoanSimulationResult {
  loanAmount: string;
  monthlyPayment: string;
  totalAmount: string;
  totalInterest: string;
  interestRate: string;
}

@Injectable()
export class LoanService {
  constructor(private readonly mailService: MailService) {}

  async simulateMultipleLoans(
    simulateLoanDtos: SimulateLoanDto[],
  ): Promise<LoanSimulationResult[]> {
    // Processa todas as simulações de forma assíncrona
    const simulations = simulateLoanDtos.map(async (dto) => {
      return this.simulateLoan(dto);
    });

    return Promise.all(simulations);
  }

  async simulateLoan(
    simulateLoanDto: SimulateLoanDto,
  ): Promise<LoanSimulationResult> {
    const { loanAmount, birthDate, months, email } = simulateLoanDto;

    if (loanAmount <= 0) {
      throw new BadRequestException(
        'O valor solicitado deve ser maior que zero.',
      );
    }

    const age = this.calculateAge(new Date(birthDate));
    const interestRate = this.getInterestRateByAge(age);

    const monthlyInterestRate = this.getMonthlyInterestRate(interestRate);
    const monthlyPayment = this.calculateMonthlyPayment(
      loanAmount,
      monthlyInterestRate,
      months,
    );

    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - loanAmount;

    this.mailService.sendSimulationToEmail(
      email,
      `Olá! O valor solicitado em sua simulação de crédito foi de ${this.formatCurrency(loanAmount)}, o pagamento mensal será de ${this.formatCurrency(monthlyPayment)}. O total pago em juros é ${this.formatCurrency(totalInterest)} e o juros anual é de ${interestRate.toFixed(2)}% ao ano.`,
    );

    return {
      loanAmount: this.formatCurrency(loanAmount),
      monthlyPayment: this.formatCurrency(monthlyPayment),
      totalAmount: this.formatCurrency(totalAmount),
      totalInterest: this.formatCurrency(totalInterest),
      interestRate: `${interestRate.toFixed(2)}% ao ano`,
    };
  }

  private calculateMonthlyPayment(
    loanAmount: number,
    monthlyInterestRate: number,
    totalPayments: number,
  ): number {
    return (
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
    );
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  private getMonthlyInterestRate(annualRate: number): number {
    // O annualRate deve ser dividido por 12 para ter a taxa mensal e dividido por 100 para termos este número em porcentagem (/100)
    return annualRate / 12 / 100;
  }

  private getInterestRateByAge(age: number): number {
    if (age <= 25) return 5;
    if (age >= 26 && age <= 40) return 3;
    if (age >= 41 && age <= 60) return 2;
    return 4;
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
