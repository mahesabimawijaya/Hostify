import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // /transaction
  @UseGuards(AuthMiddleware)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  // /transaction/notification
  @UseGuards(AuthMiddleware)
  @Post('notification')
  async handleNotification(@Body() notification: any) {
    return this.transactionService.handlePaymentNotification(notification);
  }

  // /transaction
  @Get()
  async findAll(@Query() query: any) {
    return this.transactionService.findAll(query);
  }

  // /transaction/id
  @Get('user/:id')
  async findAllByUserId(@Param('id') id: string, @Query() query: any) {
    return this.transactionService.findAllByUserId(+id, query);
  }

  // /transaction/id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  // /transaction/id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionService.delete(id);
  }
}
