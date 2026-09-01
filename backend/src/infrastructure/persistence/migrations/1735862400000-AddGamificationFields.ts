import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGamificationFields1735862400000 implements MigrationInterface {
  name = 'AddGamificationFields1735862400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`users\`
        ADD COLUMN \`xp_points\` INT NOT NULL DEFAULT 0 AFTER \`school_level\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`challenges\`
        ADD COLUMN \`xp_reward\` INT NOT NULL DEFAULT 100 AFTER \`calculator_schema\`;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `challenges` DROP COLUMN `xp_reward`;',
    );
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `xp_points`;');
  }
}
