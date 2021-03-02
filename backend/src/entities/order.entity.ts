import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  "user": User;

  @ManyToOne(() => Product, (prdt) => prdt.orders, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  "product": Product;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "datetime", nullable: true })
  "ordered_on": Date;

  @Column({ type: "varchar", nullable: true })
  "comments": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": Date;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": Date;
}
