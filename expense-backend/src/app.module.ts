import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'postgres',
        host: c.get<string>('DB_HOST'),
        port: Number(c.get('DB_PORT')),
        username: c.get<string>('DB_USER'),
        password: c.get<string>('DB_PASS'),
        database: c.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // dev ke liye: table khud ban jati hai
      }),
    }),
    ExpensesModule,
  ],
})
export class AppModule {}
