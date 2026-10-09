import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  // decimal ko Postgres string deta hai, isliye number me convert kar rahe hain
  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  amount: number;
  @Column()
  category: string;
  @Column({ type: 'date' })
  date: string;
  @Column({ nullable: true })
  note: string;
  @Column()
  userId: string; // Firebase uid
  @CreateDateColumn()
  createdAt: Date;
}
