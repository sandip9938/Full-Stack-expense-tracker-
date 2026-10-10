import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// Create expense API request body ka shape aur validation rules define karta hai.
export class CreateExpenseDto {
  // Title string hona chahiye aur empty nahi ho sakta.
  @IsString()
  @IsNotEmpty()
  title: string;

  // Amount numeric aur minimum 0.01 hona zaroori hai.
  @IsNumber()
  @Min(0.01)
  amount: number;

  // Category ek non-empty string honi chahiye.
  @IsString()
  @IsNotEmpty()
  category: string;

  // Date ISO date string format mein valid honi chahiye.
  @IsDateString()
  date: string;

  // Note optional hai; bhejne par string hona chahiye.
  @IsOptional()
  @IsString()
  note?: string;
}
