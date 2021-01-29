import { MigrationInterface, QueryRunner } from "typeorm";

export class recordkeeper1610452030842 implements MigrationInterface {
  name = "recordkeeper1610452030842";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "interest_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL DEFAULT (2), "compounding_period_in_days" integer NOT NULL DEFAULT (365), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" decimal(20,2) NOT NULL DEFAULT (0), "rate_of_interest" decimal(20,2) DEFAULT (0), "lot_number" bigint DEFAULT (0), "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "registration_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(36) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(20,2) NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(36) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar, "password" varchar, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "registration_status_id" integer, "user_roles_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL DEFAULT (2), "compounding_period_in_days" integer NOT NULL DEFAULT (365), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, CONSTRAINT "FK_131ab6ab89c332a8a58f2447c7a" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_interest_defaults"("id", "interest_rate", "compounding_period_in_days", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "interest_rate", "compounding_period_in_days", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "interest_defaults"`,
    );
    await queryRunner.query(`DROP TABLE "interest_defaults"`);
    await queryRunner.query(`ALTER TABLE "temporary_interest_defaults" RENAME TO "interest_defaults"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" decimal(20,2) NOT NULL DEFAULT (0), "rate_of_interest" decimal(20,2) DEFAULT (0), "lot_number" bigint DEFAULT (0), "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, CONSTRAINT "FK_fc2b5831072744152f27571ac22" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "comments", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "comments", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "product"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(20,2) NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_e4fccc6b647a43ae1e806e028bc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "repayment"`,
    );
    await queryRunner.query(`DROP TABLE "repayment"`);
    await queryRunner.query(`ALTER TABLE "temporary_repayment" RENAME TO "repayment"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar, "password" varchar, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "registration_status_id" integer, "user_roles_id" integer, CONSTRAINT "FK_cbdae50b6ad2a8ff7e73db4f08e" FOREIGN KEY ("registration_status_id") REFERENCES "registration_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a75112b17680221d8bd37cbf1e8" FOREIGN KEY ("user_roles_id") REFERENCES "user_roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "registration_status_id", "user_roles_id") SELECT "id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "registration_status_id", "user_roles_id" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "order"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "order_repayment"`,
    );
    await queryRunner.query(`DROP TABLE "order_repayment"`);
    await queryRunner.query(`ALTER TABLE "temporary_order_repayment" RENAME TO "order_repayment"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_repayment" RENAME TO "temporary_order_repayment"`);
    await queryRunner.query(
      `CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "temporary_order_repayment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order_repayment"`);
    await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
    await queryRunner.query(
      `CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_pricipal_debt" decimal(20,2), "remaining_interest_debt" decimal(20,2), "quantity" bigint NOT NULL DEFAULT (0), "ordered_on" datetime, "last_payment_date" datetime, "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "payment_status_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id") SELECT "id", "remaining_pricipal_debt", "remaining_interest_debt", "quantity", "ordered_on", "last_payment_date", "comments", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id", "payment_status_id" FROM "temporary_order"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar, "password" varchar, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "registration_status_id" integer, "user_roles_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "registration_status_id", "user_roles_id") SELECT "id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "registration_status_id", "user_roles_id" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "repayment" RENAME TO "temporary_repayment"`);
    await queryRunner.query(
      `CREATE TABLE "repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(20,2) NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "temporary_repayment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_repayment"`);
    await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
    await queryRunner.query(
      `CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" decimal(20,2) NOT NULL DEFAULT (0), "rate_of_interest" decimal(20,2) DEFAULT (0), "lot_number" bigint DEFAULT (0), "comments" varchar, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "comments", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "comments", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "temporary_product"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`);
    await queryRunner.query(`ALTER TABLE "interest_defaults" RENAME TO "temporary_interest_defaults"`);
    await queryRunner.query(
      `CREATE TABLE "interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL DEFAULT (2), "compounding_period_in_days" integer NOT NULL DEFAULT (365), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "interest_defaults"("id", "interest_rate", "compounding_period_in_days", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "interest_rate", "compounding_period_in_days", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "temporary_interest_defaults"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_interest_defaults"`);
    await queryRunner.query(`DROP TABLE "order_repayment"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "repayment"`);
    await queryRunner.query(`DROP TABLE "registration_status"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "payment_status"`);
    await queryRunner.query(`DROP TABLE "interest_defaults"`);
    await queryRunner.query(`DROP TABLE "interest_types"`);
  }
}
