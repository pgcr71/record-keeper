import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";
import { Order } from "./order.entity";

@Entity()
export class Product extends BaseEntity {
  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "unit_price": number;

  @Column({ type: "int", nullable: true, default: 0 })
  "rate_of_interest": number;

  @Column({ type: "bigint", nullable: true, default: 0 })
  "lot_number": string;

  @ManyToOne(type => InterestTypes)
  @JoinColumn({
    name: 'interest_type_id',
    referencedColumnName: 'id'
  })
  "interest_type": InterestTypes

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
