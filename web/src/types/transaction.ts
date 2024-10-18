import { Product } from "./product";
import { User } from "./user";

export interface Transaction {
  id: number;
  term: number;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: Date;
  product: Product;
  user: User;
}

export enum PaymentStatus {
  "success",
  "pending",
  "failed",
}
