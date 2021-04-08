import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1615613451621 implements MigrationInterface {
    name = 'recordkeeper1615613451621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_f35e8b64e41cce9d3095080aca0`");
        await queryRunner.query("ALTER TABLE `product_names` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `product_names` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `product_names` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product_names` ADD `id` varchar(36) NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `product_name_id`");
        await queryRunner.query("ALTER TABLE `product` ADD `product_name_id` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_f35e8b64e41cce9d3095080aca0` FOREIGN KEY (`product_name_id`) REFERENCES `product_names`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_f35e8b64e41cce9d3095080aca0`");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `product_name_id`");
        await queryRunner.query("ALTER TABLE `product` ADD `product_name_id` int NULL");
        await queryRunner.query("ALTER TABLE `product_names` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product_names` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `product_names` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `product_names` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_f35e8b64e41cce9d3095080aca0` FOREIGN KEY (`product_name_id`) REFERENCES `product_names`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
