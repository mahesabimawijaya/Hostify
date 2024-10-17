import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // /transaction
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  // /transaction/notification
  @Post('notification')
  async handleNotification(@Body() notification: any) {
    return this.transactionService.handlePaymentNotification(notification);
  }


  // /transaction
  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  // /transaction/id
  @Get(':id')
  async findAllByUserId(@Param('id') id: string) {
    return this.transactionService.findAllByUserId(+id);
  }

  // /transaction/id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  // /transaction/id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionService.delete(+id);
  }
}
