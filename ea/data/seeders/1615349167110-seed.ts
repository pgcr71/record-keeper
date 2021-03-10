import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Product } from '..'
import { InterestTypes } from "..";

export class seed1615349167110 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const interestType1 = getRepository(InterestTypes).create({
      name: "simple",
    });
    const product = getRepository(Product).create({
      name: 'cash',
      unit_price: 1,
      interest_type: interestType1,
      rate_of_interest: 2
    });


    await getRepository(Product).save(product);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
