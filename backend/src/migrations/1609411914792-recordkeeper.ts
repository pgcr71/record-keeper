import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609411914792 implements MigrationInterface {
    name = 'recordkeeper1609411914792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `remaining_amount_tobe_paid` bigint NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `remaining_amount_tobe_paid`");
    }

}
