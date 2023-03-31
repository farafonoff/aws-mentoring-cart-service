import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { CartItem } from './cart-item';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enumName: 'CART_STATUS',
    enum: ['OPENED', 'ORDERED'],
  })
  status: 'OPENED' | 'ORDERED';

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    {
      cascade: ['insert', 'update', 'remove'],
      eager: true,
      orphanedRowAction: 'delete',
    },
  )
  items: CartItem[];
}
