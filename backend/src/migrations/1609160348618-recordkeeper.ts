import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609160348618 implements MigrationInterface {
    name = 'recordkeeper1609160348618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` CHANGE `user_id` `userId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`");
        await queryRunner.query("ALTER TABLE `order` CHANGE `userId` `userId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `userId` `user_id` varchar(36) NOT NULL");
    }

}
