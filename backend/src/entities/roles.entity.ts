import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 36, nullable: false })
  "name": string;

  @Column({ type: "varchar", length: 255, nullable: false })
  "description": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @OneToMany(() => User, (user) => user.role)
  userRole: User[]

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @CreateDateColumn()
  "updated_on": string;
 }
