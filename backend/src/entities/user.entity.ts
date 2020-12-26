import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RegistrationStatus } from "./registration_status.entity";
import { UserRoles } from "./roles.entity";

@Entity()
export class User extends BaseEntity {

  @Column()
  "user_name": string;

  @Column()
  "password": string;

  @Column()
  "phone_number": string;

  @Column()
  "first_name": string;

  @Column()
  "last_name": string;

  @ManyToOne(() => RegistrationStatus, (statuses) => statuses.id)
  status: RegistrationStatus

  @ManyToOne(() => UserRoles, (userRoles) => userRoles.id)
  role: UserRoles

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @UpdateDateColumn()
  "updated_on": string;
}
