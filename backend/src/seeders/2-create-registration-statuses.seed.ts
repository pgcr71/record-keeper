import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { RegistrationStatus } from '../entities/registration_status.entity'

export default class CreateRegistrationStatuses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RegistrationStatus)
      .values([
        {
          name: "PHONE_AND_EMAIL",
          description: "indicates that both phone and email is verified",
        },
        {
          name: "PHONE_ONLY",
          description: "indicates that only phone is verified",
        },
        {
          name: "EMAIL_ONLY",
          description: "indicates that only email is verified",
        },
        {
          name: "NONE",
          description: "indicates that none of phone and email is verified",
        }
      ])
      .execute()
  }
}
