import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609346441036 implements MigrationInterface {
    name = 'recordkeeper1609346441036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `repayment` (`id` varchar(36) NOT NULL, `price` bigint NOT NULL DEFAULT '0', `comments` varchar(255) NULL, `paid_on` datetime NULL, `created_by` varchar(36) NULL, `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_by` varchar(36) NULL, `updated_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order` CHANGE `ordered_on` `ordered_on` datetime NULL");
        await queryRunner.query("ALTER TABLE `repayment` ADD CONSTRAINT `FK_e4fccc6b647a43ae1e806e028bc` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `repayment` DROP FOREIGN KEY `FK_e4fccc6b647a43ae1e806e028bc`");
        await queryRunner.query("ALTER TABLE `order` CHANGE `ordered_on` `ordered_on` datetime NOT NULL");
        await queryRunner.query("DROP TABLE `repayment`");
    }

}
