import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
  private snap: any;

  constructor(private configService: ConfigService) {
    this.snap = new midtransClient.Midtrans.Snap({
      isProduction: false,
      serverKey: this.configService.get('MIDTRANS_SERVER_KEY'),
      clientKey: this.configService.get('MIDTRANS_CLIENT_KEY'),
    });
  }

  async createPayment(
    orderId: string,
    grossAmount: number,
    customerDetails: any,
  ) {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: customerDetails,
    };

    return this.snap.createTransaction(parameter);
  }
}
