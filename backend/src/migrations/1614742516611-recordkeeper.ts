import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1614742516611 implements MigrationInterface {
    name = 'recordkeeper1614742516611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `monthly_interest` decimal(20,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `order` ADD `interest_type_id` int NULL");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_574295f9560a3e8380b629fa1ab` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_574295f9560a3e8380b629fa1ab`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `interest_type_id`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `monthly_interest`");
    }

}
