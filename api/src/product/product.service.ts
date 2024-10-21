import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Backup, Product } from './entities/product.entity';
import { Not, Repository } from 'typeorm';
import { response } from 'src/utils/response.util';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      description,
      price,
      term,
      totalWeb,
      totalVisit,
      storage,
      backup,
    } = createProductDto;

    if (
      !name ||
      !description ||
      !price ||
      !term ||
      !totalWeb ||
      !totalVisit ||
      !storage ||
      !backup
    ) {
      throw new BadRequestException(
        response(false, 'All fields are required!', null),
      );
    }

    const existingProduct = await this.productRepository.findOne({
      where: { name },
    });

    if (existingProduct) {
      throw new ConflictException(
        response(false, 'Product with the same name already exists!', null),
      );
    }

    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      term: createProductDto.term,
      totalWeb: createProductDto.totalWeb,
      totalVisit: createProductDto.totalVisit,
      storage: createProductDto.storage,
      backup: Backup[backup as keyof typeof Backup],
    });

    const result = await this.productRepository.save(product);

    return response(true, 'Product has been created successfully', result);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return response(true, 'Products retrieved successfully', products);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(
        response(false, 'Product is not found!', null),
      );
    }

    return response(true, 'Product retrieved', product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      name,
      description,
      price,
      term,
      totalWeb,
      totalVisit,
      storage,
      backup,
    } = updateProductDto;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(response(false, 'Product not found!', null));
    }

    const existingProduct = await this.productRepository.findOne({
      where: { name, id: Not(id) },
    });

    if (existingProduct) {
      throw new ConflictException(
        response(false, 'Product with the same name already exists!', null),
      );
    }

    const updatedProduct = Object.assign(product, updateProductDto);

    await this.productRepository.save(updatedProduct);

    return response(
      true,
      'Product has been updated successfully',
      updatedProduct,
    );
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(
        response(false, 'Product is not found!', null),
      );
    }

    // TODO: add  payment/transaction status
    const ongoingTransactions = await this.transactionRepository.findOne({
      where: { product: { id } },
    });

    if (ongoingTransactions) {
      throw new ConflictException(
        response(
          false,
          'Cannot delete product with ongoing transactions!',
          null,
        ),
      );
    }

    await this.productRepository.remove(product);

    return response(true, 'Product has been deleted successfully', null);
  }
}
