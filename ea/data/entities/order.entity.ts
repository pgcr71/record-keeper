import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";

@Entity()
export class Order extends BaseEntity {
  @Column({ type: "varchar", length: 36, nullable: false })
  "user_id": string;

  @ManyToOne(() => Product, (product) => product.orders)
  "product": Product;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "varchar", length: 36, nullable: false })
  "created_by": string;

  @CreateDateColumn()
  "created_on": Date;

  @Column({ type: "varchar", length: 36, nullable: false })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": Date;
}
