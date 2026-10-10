import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

// Application ka entry point: NestJS setup karke HTTP server yahin start hota hai.
// It is important to note that the code snippet provided is the main entry point of a NestJS application. The `bootstrap` function initializes the application, enables CORS for requests from `http://localhost:4200`, applies global validation pipes to ensure that incoming requests are validated and transformed according to the defined DTOs, and finally starts the server on port 3000. The console log confirms that the API is running and accessible at the specified URL.
async function bootstrap() {
  // Create a new NestJS application instance using the AppModule as the root module.
  const app = await NestFactory.create(AppModule);
  // Enable Cross-Origin Resource Sharing (CORS) to allow requests from the specified origin (http://localhost:4200). This is useful for enabling frontend applications running on a different port or domain to communicate with the backend API.
  app.enableCors({ origin: 'http://localhost:4200' });
  // Apply global validation pipes to the application. The `ValidationPipe` is configured with `whitelist: true`, which means that any properties not defined in the DTOs will be stripped from the incoming requests. The `transform: true` option allows automatic transformation of payloads to match the expected types defined in the DTOs.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Start the application and listen for incoming requests on port 3000. Once the server is running, log a message to the console indicating that the API is accessible at the specified URL.
  await app.listen(3000);
  // Log a message to the console confirming that the API is running and accessible at http://localhost:3000.
  console.log('API running on http://localhost:3000');
}

// Async startup function ko execute karke backend boot karta hai.
bootstrap();
