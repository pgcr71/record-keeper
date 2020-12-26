import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1608986761540 implements MigrationInterface {
    name = 'recordkeeper1608986761540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `order` (`id` varchar(36) NOT NULL, `user_id` varchar(36) NOT NULL, `quantity` bigint NOT NULL DEFAULT '0', `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `productId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(36) NOT NULL, `quantity` bigint NOT NULL DEFAULT '0', `unit_price` bigint NOT NULL DEFAULT '0', `rate_of_interest` int NULL DEFAULT '0', `lot_number` bigint NULL DEFAULT '0', `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `interestTypeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `interest_types` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `interest_defaults` (`id` int NOT NULL AUTO_INCREMENT, `interest_rate` int NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `interestTypeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `user_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone_number` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `statusId` int NULL, `roleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `registration_status` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_88991860e839c6153a7ec878d39` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_b4afbc71044473489ed204b1803` FOREIGN KEY (`interestTypeId`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `interest_defaults` ADD CONSTRAINT `FK_dab8d9998724edfc5716da2d856` FOREIGN KEY (`interestTypeId`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_dc18daa696860586ba4667a9d31` FOREIGN KEY (`statusId`) REFERENCES `registration_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `user_roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_c28e52f758e7bbc53828db92194`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_dc18daa696860586ba4667a9d31`");
        await queryRunner.query("ALTER TABLE `interest_defaults` DROP FOREIGN KEY `FK_dab8d9998724edfc5716da2d856`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_b4afbc71044473489ed204b1803`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_88991860e839c6153a7ec878d39`");
        await queryRunner.query("DROP TABLE `registration_status`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `user_roles`");
        await queryRunner.query("DROP TABLE `interest_defaults`");
        await queryRunner.query("DROP TABLE `interest_types`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `order`");
    }

}
