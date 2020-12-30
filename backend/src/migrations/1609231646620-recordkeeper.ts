import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609231646620 implements MigrationInterface {
    name = 'recordkeeper1609231646620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `interest_defaults` ADD `compounding_period_in_days` int NOT NULL DEFAULT '365'");
        await queryRunner.query("ALTER TABLE `interest_defaults` CHANGE `interest_rate` `interest_rate` int NOT NULL DEFAULT '2'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `interest_defaults` CHANGE `interest_rate` `interest_rate` int NOT NULL");
        await queryRunner.query("ALTER TABLE `interest_defaults` DROP COLUMN `compounding_period_in_days`");
    }

}
