import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MidtransService } from 'src/midtrans/midtrans.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/configs/config';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Product]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, MidtransService],
})
export class TransactionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'transaction', method: RequestMethod.POST },
        { path: 'transaction', method: RequestMethod.PATCH },
      );
  }
}
