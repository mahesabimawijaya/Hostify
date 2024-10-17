import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './configs/config';
import { MidtransService } from './midtrans/midtrans.service';
import { MidtransModule } from './midtrans/midtrans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    ProductModule,
    TransactionModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    MidtransModule,
  ],
  providers: [MidtransService],
})
export class AppModule {}
