import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1615612812614 implements MigrationInterface {
    name = 'recordkeeper1615612812614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` CHANGE `name` `product_name_id` varchar(36) NOT NULL");
        await queryRunner.query("CREATE TABLE `product_names` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `product_name_id`");
        await queryRunner.query("ALTER TABLE `product` ADD `product_name_id` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_f35e8b64e41cce9d3095080aca0` FOREIGN KEY (`product_name_id`) REFERENCES `product_names`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_f35e8b64e41cce9d3095080aca0`");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `product_name_id`");
        await queryRunner.query("ALTER TABLE `product` ADD `product_name_id` varchar(36) NOT NULL");
        await queryRunner.query("DROP TABLE `product_names`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `product_name_id` `name` varchar(36) NOT NULL");
    }

}
