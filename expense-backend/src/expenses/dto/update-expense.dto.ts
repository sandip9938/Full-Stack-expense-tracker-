import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto.js';
// Create wale saare fields, par sab optional
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}