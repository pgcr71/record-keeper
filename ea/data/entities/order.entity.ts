import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderRepayment } from "./order_repayments.entity";
import { PaymentStatus } from "./payment_statuses.entity";
import { Product } from "./product.entity";
import { Repayment } from "./repayment.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  "user": User;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  "product": Product;

  @OneToMany((type) => OrderRepayment, (repayment) => repayment.order)
  "repayments": OrderRepayment[];

  @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
  "remaining_pricipal_debt": number;

  @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
  "remaining_interest_debt": number;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "datetime", nullable: true })
  "ordered_on": Date;

  @Column({ type: "datetime", nullable: true })
  "last_payment_date": Date;

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

  @ManyToOne(() => PaymentStatus)
  @JoinColumn({
    name: "payment_status_id",
    referencedColumnName: "id",
  })
  "payment_status": PaymentStatus;

  "principal_amount": string;
  "compounding_period_in_days": number;
  "days_since_purchase": number;
  "initial_cost": number;
  "remaining_days": number;
  "interest_for_remaining_days": number;
  total_debt: number;
  interest_on_compound_period: number;
  total_with_interest_on_compound_period: number;
}
