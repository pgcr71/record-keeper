import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";
import { User } from "./user.entity";

@Entity()
export class Repayment extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  "user": User;

  @Column({ type: "decimal", nullable: false, default: 0, precision: 20, scale: 2 })
  "price": number;

  @Column({ type: "decimal", nullable: true, default: 0, precision: 20, scale: 2 })
  "monthly_interest": number;

  @ManyToOne(() => InterestTypes)
  @JoinColumn({
    name: "interest_type_id",
    referencedColumnName: "id",
  })
  "interest_type": InterestTypes;

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
