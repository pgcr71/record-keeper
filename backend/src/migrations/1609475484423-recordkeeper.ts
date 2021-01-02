import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609475484423 implements MigrationInterface {
    name = 'recordkeeper1609475484423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` CHANGE `Comments` `comments` double NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `Comments` `comments` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` CHANGE `comments` `Comments` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `comments` `Comments` double NULL");
    }

}
