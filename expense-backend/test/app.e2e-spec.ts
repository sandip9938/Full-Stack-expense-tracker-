import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

// End-to-end test: full Nest app ko HTTP requests ke zariye verify karta hai.
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // Har test se pehle app module se Nest application create aur initialize karte hain.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // GET / route ka HTTP status aur response text verify karta hai.
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Test ke baad application/server resources close karta hai.
  afterEach(async () => {
    await app.close();
  });
});
