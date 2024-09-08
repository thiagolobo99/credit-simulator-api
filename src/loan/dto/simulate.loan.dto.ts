import { IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';

export class SimulateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  loanAmount: number;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  months: number;
}
