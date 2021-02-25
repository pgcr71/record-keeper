import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { OrderRepayment } from "./order_repayments.entity";
import { Repayment } from "./repayment.entity";
import { User } from "./user.entity";

@Entity()
export class Savings extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  "user": User;

  @ManyToOne(() => Repayment, (rp) => rp.savings)
  @JoinColumn({
    name: "repayment_id",
    referencedColumnName: "id",
  })
  repayment: Repayment;


  @Column({ type: "decimal", nullable: false, default: 0, precision: 20, scale: 2 })
  "price": number;

  @Column({ type: "varchar", length: 255, nullable: true })
  "comments": string;

  @Column({ type: "datetime", nullable: true })
  "paid_on": Date;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
