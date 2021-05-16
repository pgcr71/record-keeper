import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { RegistrationStatus } from '../entities/registration_status.entity'
import { InterestTypes } from "../entities/interest_types.entity";
import { PaymentStatus } from "../entities/payment_statuses.entity";

export default class CreatePaymentStatuses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(PaymentStatus)
      .values([
        {
          name: "NOT_PAID",
          description: "indicates that both not paid for order",
        },
        {
          name: "PARTIALLY_PAID",
          description: "indicates that some amount has been paid",
        },
        {
          name: "FULLY_PAID",
          description: "indicates that fully paid for order",
        }
      ])
      .execute()
  }
}
