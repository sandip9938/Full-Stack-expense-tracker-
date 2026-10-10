import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

// AppController ka unit test: real HTTP server ya database ke bina method test karta hai.
describe('AppController', () => {
  let appController: AppController;

  // Har test se pehle isolated Nest testing module bana kar controller resolve karte hain.
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // Root endpoint ke controller method ka expected result verify karta hai.
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
