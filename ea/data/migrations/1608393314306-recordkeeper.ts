import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1608393314306 implements MigrationInterface {
    name = 'recordkeeper1608393314306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer NOT NULL DEFAULT (0), "lot_number" bigint DEFAULT (0), "interest_type_id" integer NOT NULL DEFAULT (0), "created_by" varchar(36) NOT NULL, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36) NOT NULL, "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "registration_status_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36) NOT NULL, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36) NOT NULL, "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "quantity" integer NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "created_by", "created_on", "updated_by", "updated_on" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "created_by", "created_on", "updated_by", "updated_on" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar(36) NOT NULL, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36) NOT NULL, "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL, CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar(36) NOT NULL, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36) NOT NULL, "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar, "amount_repaid" varchar NOT NULL, "payment_mode" varchar NOT NULL, "payment_id" varchar NOT NULL, "payment_status" varchar NOT NULL, "comments" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId", "amount_repaid", "payment_mode", "payment_id", "payment_status", "comments" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "productId" varchar)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId") SELECT "id", "created_by", "created_on", "updated_by", "updated_on", "user_id", "quantity", "productId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "created_by", "created_on", "updated_by", "updated_on" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "quantity" integer NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "created_by", "created_on", "updated_by", "updated_on" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "product_id" varchar NOT NULL, "quantity" integer NOT NULL, "created_by" varchar NOT NULL, "created_on" varchar NOT NULL, "updated_by" varchar NOT NULL, "updated_on" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "order"("id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on") SELECT "id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`DROP TABLE "registration_status_entity"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
