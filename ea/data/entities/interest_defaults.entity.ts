import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InterestTypes } from "./interest_types.entity";

@Entity()
export class InterestDefaults {
  @PrimaryGeneratedColumn()
  "id": number;

  @ManyToOne(() => InterestTypes, (interestType) => interestType.id)
  InterestType: InterestTypes;

  @Column({ type: "int", nullable: false })
  interest_rate: number;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @CreateDateColumn()
  "updated_on": string;
}
