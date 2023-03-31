import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OrderService } from './services';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async listOrders() {
    const result = await this.orderService.listOrders();
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders: result },
    };
  }
}
