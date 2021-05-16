import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { InterestTypes } from "../entities/interest_types.entity";
import { Product } from "../entities/product.entity";
import { ProductNames } from "../entities/product_names.entity";

export class seeddata1618152120245 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const productName = getRepository(ProductNames).create({
      name: "cash",
      description: "direct money transfer through cash or cheque or electronic modes",
    });

    await getRepository(ProductNames).save(productName);

    const interestType1 = await getRepository(InterestTypes).findOne(1);
    const product = getRepository(Product).create({
      product_name: productName,
      unit_price: 1,
      interest_type: interestType1,
      rate_of_interest: 2
    });

    await getRepository(Product).save(product);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
