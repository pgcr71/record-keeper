/* eslint-disable @typescript-eslint/no-empty-function */
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { PaymentStatus } from "..";

export class seed1610457775313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const paymentStatus1 = getRepository(PaymentStatus).create({
      name: "NOT_PAID",
      description: "indicates that both not paid for order",
    });
    const paymentStatus2 = getRepository(PaymentStatus).create({
      name: "PARTIALLY_PAID",
      description: "indicates that some amount has been paid",
    });
    const paymentStatus3 = getRepository(PaymentStatus).create({
      name: "FULLY_PAID",
      description: "indicates that fully paid for order",
    });

    await getRepository(PaymentStatus).save(paymentStatus1);
    await getRepository(PaymentStatus).save(paymentStatus2);
    await getRepository(PaymentStatus).save(paymentStatus3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
