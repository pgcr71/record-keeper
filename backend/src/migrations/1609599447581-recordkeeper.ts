import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609599447581 implements MigrationInterface {
    name = 'recordkeeper1609599447581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_amount_tobe_paid`");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_pricipal_debt` bigint NULL");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_interest_debt` bigint NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_interest_debt`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_pricipal_debt`");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_amount_tobe_paid` double NULL");
    }

}
