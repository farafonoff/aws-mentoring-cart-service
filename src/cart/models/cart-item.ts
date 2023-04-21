import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart';
import { Product } from './product';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn()
  productId: string;
  @PrimaryColumn({ type: 'uuid' })
  cartId: string;

  @Column()
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
    {
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column({ type: 'simple-json' })
  product: Product;
}
