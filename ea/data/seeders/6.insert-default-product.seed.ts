import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { RegistrationStatus } from '../entities/registration_status.entity'
import { InterestTypes } from "../entities/interest_types.entity";
import { PaymentStatus } from "../entities/payment_statuses.entity";
import { ProductNames } from "../entities/product_names.entity";
import { Product } from "../entities/product.entity";

export default class CreateDefaultProduct implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const productName = getRepository(ProductNames).create({
      name: "cash",
      description: "direct money transfer through cash or cheque or electronic modes",
    });

    await getRepository(ProductNames).save(productName);

    const interestType1 = await getRepository(InterestTypes).findOne(1);

    await getRepository(Product).save({
      product_name: productName,
      unit_price: 1,
      interest_type: interestType1,
      rate_of_interest: 2
    });
  }
}
