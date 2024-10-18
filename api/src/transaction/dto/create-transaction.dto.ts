import { PaymentStatus } from '../entities/transaction.entity';

export class CreateTransactionDto {
  term: number;
  date: Date;
  paymentMethod: string | null;
  amount: number;
  paymentStatus: PaymentStatus;
  productId: number;
  userId: number;
}
