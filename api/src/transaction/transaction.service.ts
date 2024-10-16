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
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //create
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { term, paymentMethod, amount, productId, userId } =
        createTransactionDto;

      if (!term || !paymentMethod || !amount || !productId || !userId) {
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
      const result = await this.transactionsRepository.save(transaction);

      return response(true, 'Product created successfully', result);
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
  async findAll() {
    try {
      const result = await this.transactionsRepository.find({
        relations: ['user', 'product'],
      });

      return response(true, 'Transactions fetched', result);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  //read:user
  async findAllByUserId(id: number) {
    try {
      const existedUser = await this.usersRepository.findOne({
        where: {
          id,
        },
      });

      if (!existedUser) {
        throw new NotFoundException(response(false, 'User not found', null));
      }

      const result = await this.transactionsRepository.find({
        where: {
          user: existedUser,
        },
        relations: ['product'],
      });

      return response(true, 'Transactions fetched', result);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
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

  async delete(id: number) {
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
