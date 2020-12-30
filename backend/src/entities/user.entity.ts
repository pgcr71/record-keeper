import { join } from "path";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { RegistrationStatus } from "./registration_status.entity";
import { UserRoles } from "./roles.entity";

@Entity()
export class User extends BaseEntity {

  @Column({nullable: true})
  "user_name": string;

  @Column({nullable: true})
  "password": string;

  @Column({nullable: false})
  "phone_number": string;

  @Column({nullable: false})
  "first_name": string;

  @Column()
  "last_name": string;

  @ManyToOne(type => RegistrationStatus)
  @JoinColumn({
    name: 'registration_status_id',
    referencedColumnName: 'id'
  })
  status: RegistrationStatus

  @ManyToOne(type => UserRoles)
  @JoinColumn({
    name: 'user_roles_id',
    referencedColumnName: 'id'
  })
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
