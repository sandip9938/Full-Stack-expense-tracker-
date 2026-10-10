import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto.js';
// Create DTO ke validators reuse karta hai, par PATCH request mein saare fields optional hote hain.
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}