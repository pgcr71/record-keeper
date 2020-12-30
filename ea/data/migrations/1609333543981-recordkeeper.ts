import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609333543981 implements MigrationInterface {
    name = 'recordkeeper1609333543981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" varchar PRIMARY KEY NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, "ordered_on" datetime, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" varchar PRIMARY KEY NOT NULL, "quantity" bigint NOT NULL DEFAULT (0), "created_by" varchar(36), "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_by" varchar(36), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, "product_id" varchar, CONSTRAINT "FK_539ede39e518562dfdadfddb492" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order"("id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id") SELECT "id", "quantity", "created_by", "created_on", "updated_by", "updated_on", "user_id", "product_id" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
    }

}
