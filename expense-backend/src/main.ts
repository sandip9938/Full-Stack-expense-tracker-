import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

// Application entry point.
// Start the NestJS application.
async function bootstrap() {
  // Create a new NestJS application instance using the AppModule as the root module.
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      process.env.FRONTEND_ORIGIN ?? 'http://localhost:4200',
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
    ],
  });
  // Apply global validation pipes to the application. The `ValidationPipe` is configured with `whitelist: true`, which means that any properties not defined in the DTOs will be stripped from the incoming requests. The `transform: true` option allows automatic transformation of payloads to match the expected types defined in the DTOs.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Start the application and listen for incoming requests on port 3000. Once the server is running, log a message to the console indicating that the API is accessible at the specified URL.
  await app.listen(3000);
  // Log a message to the console confirming that the API is running and accessible at http://localhost:3000.
  console.log('API running on http://localhost:3000');
}

// Async startup function ko execute karke backend boot karta hai.
bootstrap();
