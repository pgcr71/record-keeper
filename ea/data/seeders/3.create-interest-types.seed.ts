import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { RegistrationStatus } from '../entities/registration_status.entity'
import { InterestTypes } from "../entities/interest_types.entity";

export default class CreateInterestTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(InterestTypes)
      .values([
        {
          name: "simple",
        },
        {
          name: "compound",
        }
      ])
      .execute()
  }
}
