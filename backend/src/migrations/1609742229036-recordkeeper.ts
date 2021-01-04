import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609742229036 implements MigrationInterface {
    name = 'recordkeeper1609742229036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `rate_of_interest`");
        await queryRunner.query("ALTER TABLE `product` ADD `rate_of_interest` decimal(10,2) NULL DEFAULT '0.00'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `rate_of_interest`");
        await queryRunner.query("ALTER TABLE `product` ADD `rate_of_interest` int NULL DEFAULT '0'");
    }

}
