import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Repayment extends BaseEntity {

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'
  })
  "user": User;

  @Column({ type: "bigint", nullable: false, default: 0 })
  "price": string;

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
