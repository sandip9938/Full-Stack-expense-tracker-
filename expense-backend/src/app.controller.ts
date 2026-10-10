import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

// Root URL (/) ke HTTP endpoints yahan define hote hain.
@Controller()
export class AppController {
  // AppService inject hoti hai; controller request aur response ke beech ka layer hai.
  constructor(private readonly appService: AppService) {}

  // GET / par basic greeting response return karta hai.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
