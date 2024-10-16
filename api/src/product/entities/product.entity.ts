import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

enum Backup {
  WEEKLY = 'weekly',
  DAILY = 'daily',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 0 })
  price: number;

  @Column('int')
  term: number;

  @Column('int')
  totalWeb: number;

  @Column('int')
  totalVisit: number;

  @Column('int')
  storage: number;

  @Column({ type: 'enum', enum: Backup })
  backup: Backup;

  @OneToOne(() => Transaction, (transaction) => transaction.product)
  transaction: Transaction;
}
