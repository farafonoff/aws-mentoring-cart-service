import { Cart } from 'src/cart';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  userId: string;
  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;
  @Column({ type: 'simple-json' })
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  @Column({ type: 'simple-json' })
  delivery: {
    type: string;
    address: any;
  };
  @Column()
  comments: string;
  @Column()
  status: string;
  @Column()
  total: number;
}
