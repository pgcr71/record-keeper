import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1610102497358 implements MigrationInterface {
    name = 'recordkeeper1610102497358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` CHANGE `unit_price` `unit_price` decimal(20,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `rate_of_interest` `rate_of_interest` decimal(20,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `repayment` CHANGE `price` `price` decimal(20,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_pricipal_debt` `remaining_pricipal_debt` decimal(20,2) NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_interest_debt` `remaining_interest_debt` decimal(20,2) NULL");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `principal_amount` `principal_amount` decimal(20,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `interest_amount` `interest_amount` decimal(20,2) NOT NULL DEFAULT '0.00'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `interest_amount` `interest_amount` decimal(5,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `principal_amount` `principal_amount` decimal(5,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_interest_debt` `remaining_interest_debt` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_pricipal_debt` `remaining_pricipal_debt` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `repayment` CHANGE `price` `price` decimal(10,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `rate_of_interest` `rate_of_interest` decimal(10,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `unit_price` `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00'");
    }

}
