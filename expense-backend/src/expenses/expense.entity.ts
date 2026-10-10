import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// TypeORM mapping: class ke fields PostgreSQL ki expenses table ke columns hain.
@Entity('expenses')
export class Expense {
  // Database har naye expense ke liye unique numeric ID generate karta hai.
  @PrimaryGeneratedColumn()
  id: number;

  // Expense ka naam/title store karta hai.
  @Column()
  title: string;

  // decimal ko Postgres string deta hai, isliye number me convert kar rahe hain
  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  amount: number;

  // Expense ki category, jaise Food ya Travel.
  @Column()
  category: string;

  // Expense ki calendar date PostgreSQL DATE type mein store hoti hai.
  @Column({ type: 'date' })
  date: string;

  // Optional note; null allowed hai jab user note na de.
  @Column({ nullable: true })
  note: string;

  // Verified Firebase UID; is field se expense uske owner se associate hota hai.
  @Column()
  userId: string;

  // Record create hone par database creation timestamp set karta hai.
  @CreateDateColumn()
  createdAt: Date;
}
