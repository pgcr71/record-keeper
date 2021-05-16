import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";
import { Order } from "./order.entity";
import { ProductNames } from "./product_names.entity";

@Entity()
export class Product extends BaseEntity {
  @ManyToOne(() => ProductNames)
  @JoinColumn({
    name: "product_name_id",
    referencedColumnName: "id",
  })
  "product_name": ProductNames;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "decimal", nullable: false, default: 0, precision: 20, scale: 2 })
  "unit_price": number;

  @Column({ type: "decimal", nullable: true, default: 0, precision: 20, scale: 2 })
  "rate_of_interest": number;

  @Column({ type: "bigint", nullable: true, default: 0 })
  "lot_number": string;

  @Column({ type: "varchar", nullable: true })
  "comments": string;

  @ManyToOne(() => InterestTypes)
  @JoinColumn({
    name: "interest_type_id",
    referencedColumnName: "id",
  })
  "interest_type": InterestTypes;

  @OneToMany(() => Order, (ordr) => ordr.product)
  "orders": Order[];

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
