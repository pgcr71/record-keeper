import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609475018773 implements MigrationInterface {
    name = 'recordkeeper1609475018773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` ADD `Comments` double NULL");
        await queryRunner.query("ALTER TABLE `order` ADD `Comments` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `unit_price`");
        await queryRunner.query("ALTER TABLE `product` ADD `unit_price` decimal NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `repayment` DROP COLUMN `price`");
        await queryRunner.query("ALTER TABLE `repayment` ADD `price` decimal NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_amount_tobe_paid`");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_amount_tobe_paid` double NULL");
        await queryRunner.query("ALTER TABLE `order_repayment` DROP COLUMN `amount`");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD `amount` decimal NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_repayment` DROP COLUMN `amount`");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD `amount` bigint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_amount_tobe_paid`");
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_amount_tobe_paid` bigint NULL");
        await queryRunner.query("ALTER TABLE `repayment` DROP COLUMN `price`");
        await queryRunner.query("ALTER TABLE `repayment` ADD `price` bigint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `unit_price`");
        await queryRunner.query("ALTER TABLE `product` ADD `unit_price` bigint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `Comments`");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `Comments`");
    }

}
