import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from 'typeorm'
import { UserRoles } from '../entities/roles.entity'

export default class CreateUserRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserRoles)
      .values([
        {
          name: "SUPER_ADMIN",
          description: "full access to financial details, inventory details, user details etc",
        },
        {
          name: "FINANCIAL_ADMIN",
          description: "full access to financial details only",
        },

        {
          name: "INVENTORY_ADMIN",
          description: "full access to inventory details only",
        },
        {
          name: "INDIVIDUAL_USER",
          description: "full access to his details only",
        },
      ])
      .execute()
  }
}
