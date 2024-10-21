import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { response } from 'src/utils/response.util';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentStatus, Transaction } from './entities/transaction.entity';
import { MidtransService } from 'src/midtrans/midtrans.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly midtransService: MidtransService, // Inject Midtrans Service
  ) {}

  //create
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { term, amount, productId, userId } = createTransactionDto;

      if (!term || !amount || !productId || !userId) {
        throw new BadRequestException(
          response(false, 'Please fill your fields correctly', null),
        );
      }

      const existedProduct = await this.productsRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!existedProduct) {
        throw new NotFoundException(response(false, 'Product not found', null));
      }

      const existedUser = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!existedUser) {
        throw new NotFoundException(response(false, 'User not found', null));
      }

      const transaction = new Transaction();
      Object.assign(transaction, createTransactionDto);
      transaction.product = existedProduct;
      transaction.user = existedUser;

      const savedTransaction =
        await this.transactionsRepository.save(transaction);

      const payment = await this.midtransService.createPayment(
        savedTransaction.id.toString(), // Use the savedTransaction ID as the Midtrans order ID
        savedTransaction.amount,
        {
          email: existedUser.email,
          firstName: existedUser.firstName,
          lastName: existedUser.lastName,
        },
      );
      return response(true, 'Transaction created successfully', {
        paymentUrl: payment.redirect_url,
        transaction: savedTransaction,
      });
    } catch (error) {
      console.error('Error creating product:', error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  //read:admin
  async findAll(query: any) {
    try {
      const { productId } = query; // Extract optional filters from query params

      const queryBuilder = this.transactionsRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.user', 'user')
        .leftJoinAndSelect('transaction.product', 'product');

      if (productId) {
        queryBuilder.andWhere('product.id = :productId', { productId });
      }

      const result = await queryBuilder.getMany();

      return response(true, 'Transactions fetched', result);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  //read:user
  async findAllByUserId(id: number, query: any) {
    try {
      const existedUser = await this.usersRepository.findOne({
        where: {
          id,
        },
      });

      if (!existedUser) {
        throw new NotFoundException(response(false, 'User not found', null));
      }

      const { productId } = query; // Extract optional filters from query params

      // Construct the where condition for the transaction
      const whereCondition: any = {
        user: { id }, // User's ID in the transaction
      };

      // If productId is provided, add it to the where condition
      if (productId) {
        whereCondition.product = { id: productId };
      }

      // Find all transactions that match the conditions
      const transactions = await this.transactionsRepository.find({
        where: whereCondition,
        relations: ['product'], // Include the related product
      });

      return response(true, 'Transactions fetched', transactions);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const { paymentStatus } = updateTransactionDto;

      if (!paymentStatus) {
        throw new BadRequestException(
          response(false, 'Please fill your fields correctly', null),
        );
      }

      const transaction = await this.transactionsRepository.findOne({
        where: {
          id,
        },
      });

      if (!transaction) {
        throw new NotFoundException(
          response(false, 'Transaction not found', null),
        );
      }

      transaction.paymentStatus = paymentStatus;

      const result = await this.transactionsRepository.save(transaction);

      return response(true, 'Product updated successfully', result);
    } catch (error) {
      console.error('Error updating product:', error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  //midtrans
  async handlePaymentNotification(notification: any) {
    const { order_id, transaction_status, payment_type } = notification;
    const transaction = await this.transactionsRepository.findOne({
      where: { id: order_id },
    });
    console.log(transaction);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    transaction.paymentMethod = payment_type;

    if (transaction_status === 'settlement') {
      transaction.paymentStatus = PaymentStatus.SUCCESS;
    } else if (transaction_status === 'pending') {
      transaction.paymentStatus = PaymentStatus.PENDING;
    } else {
      transaction.paymentStatus = PaymentStatus.FAILED;
    }

    await this.transactionsRepository.save(transaction);
    return { message: 'Transaction status updated' };
  }

  async delete(id: string) {
    try {
      const data = await this.transactionsRepository.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw new NotFoundException(
          response(false, 'Transaction not found', null),
        );
      }

      const result = await this.transactionsRepository.remove(data);

      return response(true, 'Transaction deleted successfully', result);
    } catch (error) {
      console.error('Error deleting transaction:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
