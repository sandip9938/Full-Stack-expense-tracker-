import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard.js';
// Is controller ke tamam endpoints se pehle Firebase token verify hota hai.
@UseGuards(FirebaseAuthGuard)
// Is controller ke routes ka base path /expenses hai.
@Controller('expenses')
export class ExpensesController {
  // NestJS ExpensesService ko inject karta hai; database ka kaam service karti hai.
  constructor(private readonly service: ExpensesService) {}

  // POST /expenses: validated request body se current user ka naya expense banata hai.
  @Post()
  create(@Body() dto: CreateExpenseDto, @Req() req: any) {
    // Guard verified Firebase token se uid request.user mein rakhta hai.
    return this.service.create(dto, req.user.uid);
  }

  // GET /expenses: sirf authenticated user ke expenses ki list deta hai.
  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user.uid);
  }

  // GET /expenses/:id: URL ke id wale expense ko current user ke liye fetch karta hai.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    // ParseIntPipe id ko number mein convert karta hai; galat id par request reject hoti hai.
    return this.service.findOne(id, req.user.uid);
  }

  // PATCH /expenses/:id: diye gaye fields se current user ka expense update karta hai.
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
    @Req() req: any,
  ) {
    return this.service.update(id, dto, req.user.uid);
  }
  // DELETE /expenses/:id: current user ka specified expense delete karta hai.
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.service.remove(id, req.user.uid);
  }
}
