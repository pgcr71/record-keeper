/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { InterestDefaults, InterestTypes, RegistrationStatus, UserRoles } from "..";

export class seed1609308809874 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async up(queryRunner: QueryRunner): Promise<void> {
    const registrationStatuses1 = getRepository(RegistrationStatus).create({
      name: "PHONE_AND_EMAIL",
      description: "indicates that both phone and email is verified",
    });
    const registrationStatuses2 = getRepository(RegistrationStatus).create({
      name: "PHONE_ONLY",
      description: "indicates that only phone is verified",
    });
    const registrationStatuses3 = getRepository(RegistrationStatus).create({
      name: "EMAIL_ONLY",
      description: "indicates that only email is verified",
    });
    const registrationStatuses4 = getRepository(RegistrationStatus).create({
      name: "NONE",
      description: "indicates that none of phone and email is verified",
    });

    await getRepository(RegistrationStatus).save(registrationStatuses1);
    await getRepository(RegistrationStatus).save(registrationStatuses2);
    await getRepository(RegistrationStatus).save(registrationStatuses3);
    await getRepository(RegistrationStatus).save(registrationStatuses4);

    const userRoles1 = getRepository(UserRoles).create({
      name: "SUPER_ADMIN",
      description: "full access to financial details, inventory details, user details etc",
    });
    const userRoles2 = getRepository(UserRoles).create({
      name: "FINANCIAL_ADMIN",
      description: "full access to financial details only",
    });

    const userRoles3 = getRepository(UserRoles).create({
      name: "INVENTORY_ADMIN",
      description: "full access to inventory details only",
    });
    const userRoles4 = getRepository(UserRoles).create({
      name: "INDIVIDUAL_USER",
      description: "full access to his details only",
    });
    await getRepository(UserRoles).save(userRoles1);
    await getRepository(UserRoles).save(userRoles2);
    await getRepository(UserRoles).save(userRoles3);
    await getRepository(UserRoles).save(userRoles4);

    const interestType1 = getRepository(InterestTypes).create({
      name: "simple",
    });
    const interestType2 = getRepository(InterestTypes).create({
      name: "compound",
    });

    await getRepository(InterestTypes).save(interestType1);
    await getRepository(InterestTypes).save(interestType2);

    const interestDefaults = getRepository(InterestDefaults).create({
      interest_rate: 2,
      interest_type: interestType1,
    });

    await getRepository(InterestDefaults).save(interestDefaults);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
