import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders)
  "user": User;

  @ManyToOne(() => Product, (product) => product.orders)
  "product": Product;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": Date;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": Date;
}
