import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609080533162 implements MigrationInterface {
    name = 'recordkeeper1609080533162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar)`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer)`);
        await queryRunner.query(`CREATE TABLE "interest_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(36) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "statusId" integer, "roleId" integer)`);
        await queryRunner.query(`CREATE TABLE "registration_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(36) NOT NULL, "description" varchar(255) NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar, CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "productId") SELECT "id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "productId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer, CONSTRAINT "FK_b4afbc71044473489ed204b1803" FOREIGN KEY ("interestTypeId") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer, CONSTRAINT "FK_dab8d9998724edfc5716da2d856" FOREIGN KEY ("interestTypeId") REFERENCES "interest_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_interest_defaults"("id", "interest_rate", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId") SELECT "id", "interest_rate", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId" FROM "interest_defaults"`);
        await queryRunner.query(`DROP TABLE "interest_defaults"`);
        await queryRunner.query(`ALTER TABLE "temporary_interest_defaults" RENAME TO "interest_defaults"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "statusId" integer, "roleId" integer, CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "registration_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "user_roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "statusId", "roleId") SELECT "id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "statusId", "roleId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, "phone_number" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "statusId" integer, "roleId" integer)`);
        await queryRunner.query(`INSERT INTO "user"("id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "statusId", "roleId") SELECT "id", "user_name", "password", "phone_number", "first_name", "last_name", "created_by", "created_on", "updated_by", "updated_on", "statusId", "roleId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "interest_defaults" RENAME TO "temporary_interest_defaults"`);
        await queryRunner.query(`CREATE TABLE "interest_defaults" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "interest_rate" integer NOT NULL, "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer)`);
        await queryRunner.query(`INSERT INTO "interest_defaults"("id", "interest_rate", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId") SELECT "id", "interest_rate", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId" FROM "temporary_interest_defaults"`);
        await queryRunner.query(`DROP TABLE "temporary_interest_defaults"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "unit_price" bigint NOT NULL DEFAULT (0), "rate_of_interest" integer DEFAULT (0), "lot_number" bigint DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "interestTypeId" integer)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId") SELECT "id", "name", "quantity", "unit_price", "rate_of_interest", "lot_number", "created_by", "created_on", "updated_by", "updated_on", "interestTypeId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar(36) NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar)`);
        await queryRunner.query(`INSERT INTO "order"("id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "productId") SELECT "id", "user_id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "productId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`DROP TABLE "registration_status"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "interest_defaults"`);
        await queryRunner.query(`DROP TABLE "interest_types"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
