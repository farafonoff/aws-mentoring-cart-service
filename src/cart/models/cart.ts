import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cart-item';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
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
