import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { Repayment } from "./repayment.entity";

@Entity()
export class OrderRepayment extends BaseEntity {
  @ManyToOne(() => Order)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  "order": Order;

  @ManyToOne(() => Repayment)
  @JoinColumn({
    name: "payment_id",
    referencedColumnName: "id",
  })
  "payment": Repayment;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "amount": number;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}