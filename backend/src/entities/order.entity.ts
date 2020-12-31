import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PaymentStatus } from "./payment_statuses.entity";
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

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  "product": Product;

  @Column({ type: "bigint", nullable: true })
  "remaining_amount_tobe_paid": number;

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

  @Column({ type: "datetime", nullable: true })
  "ordered_on": Date;

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
