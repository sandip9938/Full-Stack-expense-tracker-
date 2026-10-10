import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module.js';

// Root module: global configuration, database connection aur feature modules ko jodta hai.
@Module({
  imports: [
    // .env values load karta hai aur ConfigService ko sab modules mein available karta hai.
    ConfigModule.forRoot({ isGlobal: true }),
    // ConfigService se environment values lekar PostgreSQL connection configure hota hai.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        // PostgreSQL driver aur connection settings; ye values .env se aati hain.
        type: 'postgres',
        host: c.get<string>('DB_HOST'),
        port: Number(c.get('DB_PORT')),
        username: c.get<string>('DB_USER'),
        password: c.get<string>('DB_PASS'),
        database: c.get<string>('DB_NAME'),
        // Feature modules mein registered entities ko TypeORM automatically load karta hai.
        autoLoadEntities: true,
        // Development mein entity schema se tables sync karta hai; production mein migrations use karein.
        synchronize: true, // dev ke liye: table khud ban jati hai
      }),
    }),
    // Expense APIs, service aur entity ka feature module register karta hai.
    ExpensesModule,
  ],
})
export class AppModule {}
