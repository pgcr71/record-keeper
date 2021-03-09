import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1614997380141 implements MigrationInterface {
    name = 'recordkeeper1614997380141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `repayment` ADD `monthly_interest` decimal(20,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `repayment` ADD `interest_type_id` int NULL");
        await queryRunner.query("ALTER TABLE `repayment` ADD CONSTRAINT `FK_2548e5567f9d0b27ed5636ce132` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `repayment` DROP FOREIGN KEY `FK_2548e5567f9d0b27ed5636ce132`");
        await queryRunner.query("ALTER TABLE `repayment` DROP COLUMN `interest_type_id`");
        await queryRunner.query("ALTER TABLE `repayment` DROP COLUMN `monthly_interest`");
    }

}
