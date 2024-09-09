import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SimulateLoanDto } from './simulate.loan.dto';

export class MultipleSimulateLoanDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SimulateLoanDto)
  simulations: SimulateLoanDto[];
}
