import { Injectable } from '@nestjs/common';
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

    const age = this.calculateAge(new Date(birthDate));
    const interestRate = this.getInterestRateByAge(age);

    console.log(age);
    console.log(interestRate);

    const monthlyInterestRate = this.getMonthlyInterestRate(interestRate);
    const totalPayments = months;

    console.log(monthlyInterestRate);
    console.log(totalPayments);

    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    console.log(monthlyPayment);

    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;

    return {
      loanAmount: this.formatCurrency(loanAmount),
      monthlyPayment: this.formatCurrency(monthlyPayment),
      totalAmount: this.formatCurrency(totalAmount),
      totalInterest: this.formatCurrency(totalInterest),
      interestRate: `${interestRate.toFixed(2)}% ao ano`,
    };
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
