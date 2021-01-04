import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609743759992 implements MigrationInterface {
    name = 'recordkeeper1609743759992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" bigint NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_e4fccc6b647a43ae1e806e028bc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "repayment"`);
        await queryRunner.query(`DROP TABLE "repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_repayment" RENAME TO "repayment"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "ordered_on" datetime, "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order_repayment"("id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "order_repayment"`);
        await queryRunner.query(`DROP TABLE "order_repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_repayment" RENAME TO "order_repayment"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, "comments" varchar, CONSTRAINT "FK_fc2b5831072744152f27571ac22" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "ordered_on" datetime, "user_id" varchar, "product_id" varchar, "payment_status_id" integer, "remaining_pricipal_debt" decimal(10,2), "remaining_interest_debt" decimal(10,2), "last_payment_date" datetime, "comments" varchar, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, "principal_amount" decimal(5,2) NOT NULL DEFAULT (0), "interest_amount" decimal(5,2) NOT NULL DEFAULT (0), CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order_repayment"("id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "order_repayment"`);
        await queryRunner.query(`DROP TABLE "order_repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_repayment" RENAME TO "order_repayment"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" decimal(10,2) NOT NULL DEFAULT (0), "rate_of_interest" decimal(10,2) DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, "comments" varchar, CONSTRAINT "FK_fc2b5831072744152f27571ac22" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id", "comments") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id", "comments" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(10,2) NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_e4fccc6b647a43ae1e806e028bc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "repayment"`);
        await queryRunner.query(`DROP TABLE "repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_repayment" RENAME TO "repayment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repayment" RENAME TO "temporary_repayment"`);
        await queryRunner.query(`CREATE TABLE "repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" bigint NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_e4fccc6b647a43ae1e806e028bc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "temporary_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_repayment"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, "comments" varchar, CONSTRAINT "FK_fc2b5831072744152f27571ac22" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id", "comments") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id", "comments" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "order_repayment" RENAME TO "temporary_order_repayment"`);
        await queryRunner.query(`CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order_repayment"("id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "temporary_order_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_order_repayment"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "ordered_on" datetime, "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interest_type_id" integer, CONSTRAINT "FK_fc2b5831072744152f27571ac22" FOREIGN KEY ("interest_type_id") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interest_type_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "order_repayment" RENAME TO "temporary_order_repayment"`);
        await queryRunner.query(`CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "amount" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order_repayment"("id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "temporary_order_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_order_repayment"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "remaining_amount_tobe_paid" bigint, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "ordered_on" datetime, "user_id" varchar, "product_id" varchar, "payment_status_id" integer, CONSTRAINT "FK_8df56a6ff2edcdbc1706d2ebdd9" FOREIGN KEY ("payment_status_id") REFERENCES "payment_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "ordered_on", "user_id", "product_id", "payment_status_id" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "repayment" RENAME TO "temporary_repayment"`);
        await queryRunner.query(`CREATE TABLE "repayment" ("id" varchar PRIMARY KEY NOT NULL, "price" bigint NOT NULL DEFAULT (0), "comments" varchar(255), "paid_on" datetime, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_e4fccc6b647a43ae1e806e028bc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "repayment"("id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id") SELECT "id", "price", "comments", "paid_on", "created_by", "created_on", "updated_by", "updated_on", "user_id" FROM "temporary_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_repayment"`);
    }

}
