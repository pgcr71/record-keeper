import {MigrationInterface, QueryRunner} from "typeorm";

export class recordkeeper1609160179419 implements MigrationInterface {
    name = 'recordkeeper1609160179419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_caabe91507b3379c7ba73637b84` ON `order`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE INDEX `FK_caabe91507b3379c7ba73637b84` ON `order` (`user_id`)");
    }

}
