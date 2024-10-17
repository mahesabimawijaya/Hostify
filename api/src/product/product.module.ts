import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/configs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Transaction]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PATCH },
        { path: 'products/:id', method: RequestMethod.DELETE },
      );
  }
}
