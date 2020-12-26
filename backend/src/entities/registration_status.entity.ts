import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class RegistrationStatus {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @OneToMany(() => User, (user) => user.status)
  userStatus: User[]

  @Column({ type: "varchar", length: 255, nullable: false })
  "description": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
