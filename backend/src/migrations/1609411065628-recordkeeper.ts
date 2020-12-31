import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609411065628 implements MigrationInterface {
    name = 'recordkeeper1609411065628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `order_repayment` (`id` varchar(36) NOT NULL, `amount` bigint NOT NULL DEFAULT '0', `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `order_id` varchar(36) NULL, `payment_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_53108062762d7fb9931a2fad33c` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_eb8c2bec43bc0d35c6fe44af944` FOREIGN KEY (`payment_id`) REFERENCES `repayment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_eb8c2bec43bc0d35c6fe44af944`");
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_53108062762d7fb9931a2fad33c`");
        await queryRunner.query("DROP TABLE `order_repayment`");
    }

}
