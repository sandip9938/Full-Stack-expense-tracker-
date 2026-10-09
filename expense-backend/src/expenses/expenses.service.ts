import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
@Injectable()
export class ExpensesService {
constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}
// CREATE
create(dto: CreateExpenseDto, uid: string) {
const expense = this.repo.create({ ...dto, userId: uid });
return this.repo.save(expense);
}
// READ (all)
findAll(uid: string) {
return this.repo.find({
where: { userId: uid },
order: { date: 'DESC', id: 'DESC' },
});
}
// READ (one)
async findOne(id: number, uid: string) {
const expense = await this.repo.findOne({ where: { id, userId: uid } });
if (!expense) throw new NotFoundException('Expense not found');
return expense;
}
// UPDATE
async update(id: number, dto: UpdateExpenseDto, uid: string) {
const expense = await this.findOne(id, uid);
Object.assign(expense, dto);
return this.repo.save(expense);
}
// DELETE
async remove(id: number, uid: string) {
const expense = await this.findOne(id, uid);
await this.repo.remove(expense);
return { message: 'Expense deleted' };
}
}