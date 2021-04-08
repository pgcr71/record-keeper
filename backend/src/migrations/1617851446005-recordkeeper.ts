import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1617851446005 implements MigrationInterface {
    name = 'recordkeeper1617851446005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `interest_types` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `interest_defaults` (`id` int NOT NULL AUTO_INCREMENT, `interest_rate` int NOT NULL DEFAULT '2', `compounding_period_in_days` int NOT NULL DEFAULT '365', `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `interest_type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product_names` (`id` varchar(36) NOT NULL, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `quantity` bigint NOT NULL DEFAULT '0', `unit_price` decimal(20,2) NOT NULL DEFAULT '0.00', `rate_of_interest` decimal(20,2) NULL DEFAULT '0.00', `lot_number` bigint NULL DEFAULT '0', `comments` varchar(255) NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `product_name_id` varchar(36) NULL, `interest_type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `registration_status` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `repayment` (`id` varchar(36) NOT NULL, `price` decimal(20,2) NOT NULL DEFAULT '0.00', `monthly_interest` decimal(20,2) NULL DEFAULT '0.00', `comments` varchar(255) NULL, `paid_on` datetime NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` varchar(36) NULL, `interest_type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `user_name` varchar(255) NULL, `password` varchar(255) NULL, `phone_number` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `registration_status_id` int NULL, `user_roles_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`id` varchar(36) NOT NULL, `quantity` bigint NOT NULL DEFAULT '0', `monthly_interest` decimal(20,2) NULL DEFAULT '0.00', `ordered_on` datetime NULL, `comments` varchar(255) NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` varchar(36) NULL, `product_id` varchar(36) NULL, `interest_type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payment_status` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `interest_defaults` ADD CONSTRAINT `FK_131ab6ab89c332a8a58f2447c7a` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_f35e8b64e41cce9d3095080aca0` FOREIGN KEY (`product_name_id`) REFERENCES `product_names`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_fc2b5831072744152f27571ac22` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `repayment` ADD CONSTRAINT `FK_e4fccc6b647a43ae1e806e028bc` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `repayment` ADD CONSTRAINT `FK_2548e5567f9d0b27ed5636ce132` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_cbdae50b6ad2a8ff7e73db4f08e` FOREIGN KEY (`registration_status_id`) REFERENCES `registration_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_a75112b17680221d8bd37cbf1e8` FOREIGN KEY (`user_roles_id`) REFERENCES `user_roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_199e32a02ddc0f47cd93181d8fd` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_539ede39e518562dfdadfddb492` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_574295f9560a3e8380b629fa1ab` FOREIGN KEY (`interest_type_id`) REFERENCES `interest_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_574295f9560a3e8380b629fa1ab`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_539ede39e518562dfdadfddb492`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_199e32a02ddc0f47cd93181d8fd`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_a75112b17680221d8bd37cbf1e8`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_cbdae50b6ad2a8ff7e73db4f08e`");
        await queryRunner.query("ALTER TABLE `repayment` DROP FOREIGN KEY `FK_2548e5567f9d0b27ed5636ce132`");
        await queryRunner.query("ALTER TABLE `repayment` DROP FOREIGN KEY `FK_e4fccc6b647a43ae1e806e028bc`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_fc2b5831072744152f27571ac22`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_f35e8b64e41cce9d3095080aca0`");
        await queryRunner.query("ALTER TABLE `interest_defaults` DROP FOREIGN KEY `FK_131ab6ab89c332a8a58f2447c7a`");
        await queryRunner.query("DROP TABLE `payment_status`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `user_roles`");
        await queryRunner.query("DROP TABLE `repayment`");
        await queryRunner.query("DROP TABLE `registration_status`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `product_names`");
        await queryRunner.query("DROP TABLE `interest_defaults`");
        await queryRunner.query("DROP TABLE `interest_types`");
    }

}
