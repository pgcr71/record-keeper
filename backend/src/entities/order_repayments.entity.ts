import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { Repayment } from "./repayment.entity";

@Entity()
export class OrderRepayment extends BaseEntity {
  @ManyToOne(() => Order, order => order.repayments)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  "order": Order;

  @ManyToOne(() => Repayment, repayment => repayment.orderRepayment)
  @JoinColumn({
    name: "payment_id",
    referencedColumnName: "id",
  })
  "payment": Repayment;

  @Column({ type: "decimal", nullable: false, default: 0, precision:5, scale:2 })
  "principal_amount": number;

  @Column({ type: "decimal", nullable: false, default: 0, precision:5, scale:2 })
  "interest_amount": number;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
