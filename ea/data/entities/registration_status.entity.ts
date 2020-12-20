import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class RegistrationStatusEntity extends BaseEntity {
  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @Column({ type: "varchar", length: 255, nullable: false })
  "description": string;

  @Column({ type: "varchar", length: 36, nullable: false })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: false })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
