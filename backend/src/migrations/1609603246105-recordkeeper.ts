import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609603246105 implements MigrationInterface {
    name = 'recordkeeper1609603246105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `last_payment_date` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `last_payment_date`");
    }

}
