import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'success',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: number;

  @Column('decimal', { precision: 10, scale: 0 })
  amount: number;

  @Column({ nullable: true })
  paymentMethod: string | null;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
