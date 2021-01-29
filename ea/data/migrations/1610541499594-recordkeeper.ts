import { MigrationInterface, QueryRunner } from "typeorm";

export class recordkeeper1610541499594 implements MigrationInterface {
  name = "recordkeeper1610541499594";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "order"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "order"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
    await queryRunner.query(
      `CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "temporary_order"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`);
    await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
    await queryRunner.query(
      `CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "temporary_order"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`);
  }
}
