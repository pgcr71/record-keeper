import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";
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

  @Column({ type: "decimal", nullable: true, default: 0, precision: 20, scale: 2 })
  "monthly_interest": number;

  @ManyToOne(() => InterestTypes)
  @JoinColumn({
    name: "interest_type_id",
    referencedColumnName: "id",
  })
  "interest_type": InterestTypes;

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
