import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609333404171 implements MigrationInterface {
    name = 'recordkeeper1609333404171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `ordered_on` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `ordered_on`");
    }

}
