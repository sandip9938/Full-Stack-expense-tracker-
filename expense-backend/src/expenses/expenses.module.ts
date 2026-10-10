import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard.js';
import { Expense } from './expense.entity.js';
import { ExpensesController } from './expenses.controller.js';
import { ExpensesService } from './expenses.service.js';

// Expense feature ki dependencies, routes aur injectable classes ko ek jagah register karta hai.
@Module({
  // Is feature ke andar Expense repository inject karke database operations karne deta hai.
  imports: [TypeOrmModule.forFeature([Expense])],
  // HTTP endpoints ko controller handle karta hai.
  controllers: [ExpensesController],
  // Business logic service aur Firebase authentication guard injectable hote hain.
  providers: [ExpensesService, FirebaseAuthGuard],
})
export class ExpensesModule {}