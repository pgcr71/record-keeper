import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609391862713 implements MigrationInterface {
    name = 'recordkeeper1609391862713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `payment_status` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order` ADD `payment_status_id` int NULL");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_8df56a6ff2edcdbc1706d2ebdd9` FOREIGN KEY (`payment_status_id`) REFERENCES `payment_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_8df56a6ff2edcdbc1706d2ebdd9`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `payment_status_id`");
        await queryRunner.query("DROP TABLE `payment_status`");
    }

}
