import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
  IsEmail,
} from 'class-validator';

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

  @IsEmail()
  email: string;
}
