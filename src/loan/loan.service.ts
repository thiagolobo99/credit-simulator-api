import { Injectable, BadRequestException } from '@nestjs/common';
import { SimulateLoanDto } from './dto/simulate.loan.dto';

export interface LoanSimulationResult {
  loanAmount: string;
  monthlyPayment: string;
  totalAmount: string;
  totalInterest: string;
  interestRate: string;
}

@Injectable()
export class LoanService {
  simulateLoan(simulateLoanDto: SimulateLoanDto): LoanSimulationResult {
    const { loanAmount, birthDate, months } = simulateLoanDto;

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
