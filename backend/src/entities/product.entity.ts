import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";

@Entity()
export class Product extends BaseEntity {
  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "quantity": number;

  @Column({ type: "decimal", nullable: false, default: 0 })
  "unit_price": number;

  @Column({ type: "int", nullable: true, default: 0 })
  "rate_of_interest": number;

  @Column({ type: "bigint", nullable: true, default: 0 })
  "lot_number": string;

  @Column({type: 'double', nullable: true})
  "comments": string;

  @ManyToOne(() => InterestTypes)
  @JoinColumn({
    name: "interest_type_id",
    referencedColumnName: "id",
  })
  "interest_type": InterestTypes;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
