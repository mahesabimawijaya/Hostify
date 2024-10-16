import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum PaymentMethod {
  QRIS = 'qris',
  BCAVA = 'bcava',
}

enum PaymentStatus {
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

  @Column()
  date: Date;

  @Column()
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @OneToOne(() => Product, (product) => product.transaction)
  product: Product;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
