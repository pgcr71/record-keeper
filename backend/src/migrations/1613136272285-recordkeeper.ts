import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1613136272285 implements MigrationInterface {
    name = 'recordkeeper1613136272285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_539ede39e518562dfdadfddb492`");
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_53108062762d7fb9931a2fad33c`");
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_eb8c2bec43bc0d35c6fe44af944`");
        await queryRunner.query("CREATE TABLE `savings` (`id` varchar(36) NOT NULL, `price` decimal(20,2) NOT NULL DEFAULT '0.00', `comments` varchar(255) NULL, `paid_on` datetime NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` varchar(36) NULL, `repayment_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `savings` ADD CONSTRAINT `FK_cc13497e1663c2da1a02403b1da` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `savings` ADD CONSTRAINT `FK_d8bf4ff2d486b9cf7c636fe31d9` FOREIGN KEY (`repayment_id`) REFERENCES `repayment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_539ede39e518562dfdadfddb492` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_53108062762d7fb9931a2fad33c` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_eb8c2bec43bc0d35c6fe44af944` FOREIGN KEY (`payment_id`) REFERENCES `repayment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_eb8c2bec43bc0d35c6fe44af944`");
        await queryRunner.query("ALTER TABLE `order_repayment` DROP FOREIGN KEY `FK_53108062762d7fb9931a2fad33c`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_539ede39e518562dfdadfddb492`");
        await queryRunner.query("ALTER TABLE `savings` DROP FOREIGN KEY `FK_d8bf4ff2d486b9cf7c636fe31d9`");
        await queryRunner.query("ALTER TABLE `savings` DROP FOREIGN KEY `FK_cc13497e1663c2da1a02403b1da`");
        await queryRunner.query("DROP TABLE `savings`");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_eb8c2bec43bc0d35c6fe44af944` FOREIGN KEY (`payment_id`) REFERENCES `repayment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_repayment` ADD CONSTRAINT `FK_53108062762d7fb9931a2fad33c` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_539ede39e518562dfdadfddb492` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
