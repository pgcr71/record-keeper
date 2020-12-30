import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { BaseEntity } from "./base.entity";
import { InterestTypes } from "./interest_types.entity";
import { User } from "./user.entity";

@Entity()
export class InterestDefaults {
  @PrimaryGeneratedColumn()
  "id": number;

  @ManyToOne(type => InterestTypes)
  @JoinColumn({
    name: "interest_type_id",
    referencedColumnName: "id"
})
  "interest_type": InterestTypes

  @Column({ type: "int", nullable: false, default: 2 })
  "interest_rate": number

  @Column({type: 'int', nullable: false, default: 365})
  compounding_period_in_days: number;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @CreateDateColumn()
  "updated_on": string;
 }
