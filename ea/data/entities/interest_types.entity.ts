import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InterestDefaults } from "./interest_defaults.entity";
import { Product } from "./product.entity";

@Entity()
export class InterestTypes {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({ type: "varchar", length: 255, nullable: false })
  "name": string;

  @OneToMany(() => InterestDefaults, (interestDefault) => interestDefault.InterestType)
  "DefaultInterest": InterestDefaults[];

  @OneToMany(() => Product, (product) => product.InterestType)
  "ProductDefaultInterest": Product[];

  @Column({ type: "varchar", length: 36, nullable: true })
  "created_by": string;

  @CreateDateColumn()
  "created_on": string;

  @Column({ type: "varchar", length: 36, nullable: true })
  "updated_by": string;

  @CreateDateColumn()
  "updated_on": string;
}
