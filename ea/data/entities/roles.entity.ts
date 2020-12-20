import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Order extends BaseEntity {
  @Column()
  "amount_repaid": string;
  @Column()
  "payment_mode": string;
  @Column()
  "payment_id": string;
  @Column()
  "payment_status": string;
  @Column()
  "comments": number;
  @Column()
  "created_by": string;
  @Column()
  "created_on": string;
  @Column()
  "updated_by": string;
  @Column()
  "updated_on": string;
}
