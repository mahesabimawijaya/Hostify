import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';

enum Roles {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
