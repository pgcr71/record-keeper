import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609681648729 implements MigrationInterface {
    name = 'recordkeeper1609681648729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` CHANGE `unit_price` `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `repayment` CHANGE `price` `price` decimal(10,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_pricipal_debt` `remaining_pricipal_debt` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_interest_debt` `remaining_interest_debt` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `principal_amount` `principal_amount` decimal(5,2) NOT NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `interest_amount` `interest_amount` decimal(5,2) NOT NULL DEFAULT '0.00'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `interest_amount` `interest_amount` decimal(10,0) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `order_repayment` CHANGE `principal_amount` `principal_amount` decimal(10,0) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_interest_debt` `remaining_interest_debt` decimal(10,0) NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `remaining_pricipal_debt` `remaining_pricipal_debt` decimal(10,0) NULL");
        await queryRunner.query("ALTER TABLE `repayment` CHANGE `price` `price` decimal(10,0) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `unit_price` `unit_price` decimal(2,2) NOT NULL DEFAULT '0.00'");
    }

}
