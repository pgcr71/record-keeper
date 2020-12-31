import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 255, nullable: false })
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
