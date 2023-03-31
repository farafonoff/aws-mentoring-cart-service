import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(private database: EntityManager) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.database.findOneBy(Cart, { userId });
  }

  async createByUserId(userId: string) {
    const userCart: Cart = {
      id: undefined,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'OPENED',
      items: [],
    };

    const result = await this.database.create(Cart, userCart);
    return result;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId);

    cart.items = [
      ...items.map(item => {
        return {
          ...item,
          productId: item.product.id,
        };
      }),
    ];

    this.database.save(cart);

    return { ...cart };
  }

  async removeByUserId(userId) {
    await this.database.delete(Cart, { userId });
  }
}
