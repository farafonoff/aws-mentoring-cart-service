import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Order } from '../models';

@Injectable()
export class OrderService {
  async listOrders() {
    return await this.database.find(Order);
  }
  constructor(private database: EntityManager) {}
  async create(data: any) {
    const order = {
      ...data,
      status: 'inProgress',
    };
    const orderEntity = this.database.create<Order>(Order, order);
    return await this.database.save(orderEntity);
  }
}
