import { PaymentMethod, PaymentStatus } from '../entities/transaction.entity';

export class CreateTransactionDto {
  term: number;
  date: Date;
  paymentMethod: PaymentMethod;
  amount: number;
  paymentStatus: PaymentStatus;
  productId: number;
  userId: number;
}
