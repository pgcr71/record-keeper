import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class ProductNames extends BaseEntity {
  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @Column({ type: "varchar", length: 255, nullable: false })
  "description": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @CreateDateColumn()
  "updated_on": string;
}
