import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { RegistrationStatus } from '../entities/registration_status.entity'
import { InterestTypes } from "../entities/interest_types.entity";
import { InterestDefaults } from "../entities/interest_defaults.entity";

export default class CreateInterestDefaults implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(InterestDefaults)
      .values([
        {
          interest_rate: 2,
          interest_type: {
            id: 1,
            name: "simple",
          },
        },
      ])
      .execute()
  }
}
