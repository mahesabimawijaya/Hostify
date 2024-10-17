import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Backup {
  weekly = 'weekly',
  daily = 'daily',
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

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions: Transaction[];
}
