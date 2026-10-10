import { Injectable } from '@nestjs/common';

// Root application ke reusable operations rakhne wali injectable service.
@Injectable()
export class AppService {
  // Root endpoint ke liye simple greeting text return karta hai.
  getHello(): string {
    return 'Hello World!';
  }
}
