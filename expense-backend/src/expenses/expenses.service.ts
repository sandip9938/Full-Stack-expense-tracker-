import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';

// Expense feature ka business logic aur database access yahan rakha gaya hai.
@Injectable()
export class ExpensesService {
  // TypeORM repository inject karke Expense table par CRUD operations karte hain.
  constructor(
    @InjectRepository(Expense) private readonly repo: Repository<Expense>,
  ) {}

  // DTO se naya record banata hai; userId verified Firebase UID se set hota hai.
  create(dto: CreateExpenseDto, uid: string) {
    const expense = this.repo.create({ ...dto, userId: uid });
    return this.repo.save(expense);
  }

  // Sirf current user ke expenses return karta hai; latest date/id pehle aate hain.
  findAll(uid: string) {
    return this.repo.find({
      where: { userId: uid },
      order: { date: 'DESC', id: 'DESC' },
    });
  }

  // ID aur owner UID dono match hone par expense deta hai, warna 404 throw karta hai.
  async findOne(id: number, uid: string) {
    const expense = await this.repo.findOne({ where: { id, userId: uid } });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  // Pehle ownership check karta hai, phir DTO ke aaye fields update karke save karta hai.
  async update(id: number, dto: UpdateExpenseDto, uid: string) {
    const expense = await this.findOne(id, uid);
    Object.assign(expense, dto);
    return this.repo.save(expense);
  }

  // Pehle ownership verify karta hai, phir expense delete karke confirmation return karta hai.
  async remove(id: number, uid: string) {
    const expense = await this.findOne(id, uid);
    await this.repo.remove(expense);
    return { message: 'Expense deleted' };
  }
}