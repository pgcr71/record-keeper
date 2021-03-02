import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1614575464422 implements MigrationInterface {
    name = 'recordkeeper1614575464422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_8df56a6ff2edcdbc1706d2ebdd9`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_pricipal_debt`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_interest_debt`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `last_payment_date`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `payment_status_id`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `payment_status_id` int NULL");
        await queryRunner.query("ALTER TABLE `order` ADD `last_payment_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_interest_debt` decimal(20,2) NULL");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_pricipal_debt` decimal(20,2) NULL");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_8df56a6ff2edcdbc1706d2ebdd9` FOREIGN KEY (`payment_status_id`) REFERENCES `payment_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
