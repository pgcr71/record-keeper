import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1610782149305 implements MigrationInterface {
    name = 'recordkeeper1610782149305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "order_repayment"`);
        await queryRunner.query(`DROP TABLE "order_repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_repayment" RENAME TO "order_repayment"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "order_repayment"`);
        await queryRunner.query(`DROP TABLE "order_repayment"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_repayment" RENAME TO "order_repayment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_repayment" RENAME TO "temporary_order_repayment"`);
        await queryRunner.query(`CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar)`);
        await queryRunner.query(`INSERT INTO "order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "temporary_order_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_order_repayment"`);
        await queryRunner.query(`ALTER TABLE "order_repayment" RENAME TO "temporary_order_repayment"`);
        await queryRunner.query(`CREATE TABLE "order_repayment" ("id" varchar PRIMARY KEY NOT NULL, "principal_amount" decimal(20,2) NOT NULL DEFAULT (0), "interest_amount" decimal(20,2) NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "order_id" varchar, "payment_id" varchar, CONSTRAINT "FK_eb8c2bec43bc0d35c6fe44af944" FOREIGN KEY ("payment_id") REFERENCES "repayment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_53108062762d7fb9931a2fad33c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order_repayment"("id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id") SELECT "id", "principal_amount", "interest_amount", "created_by", "created_on", "updated_by", "updated_on", "order_id", "payment_id" FROM "temporary_order_repayment"`);
        await queryRunner.query(`DROP TABLE "temporary_order_repayment"`);
    }

}
