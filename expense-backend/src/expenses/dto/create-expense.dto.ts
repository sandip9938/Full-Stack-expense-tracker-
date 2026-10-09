import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @Min(0.01)
  amount: number;
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsDateString()
  date: string;
  @IsOptional()
  @IsString()
  note?: string;
}
