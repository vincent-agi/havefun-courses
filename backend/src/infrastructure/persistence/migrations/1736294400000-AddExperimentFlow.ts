import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExperimentFlow1736294400000 implements MigrationInterface {
  name = 'AddExperimentFlow1736294400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`challenges\`
        ADD COLUMN \`notion_key\` VARCHAR(64) NULL AFTER \`calculator_schema\`,
        ADD COLUMN \`guided_experiment\` JSON NULL AFTER \`notion_key\`,
        ADD COLUMN \`autonomous_challenge\` JSON NULL AFTER \`guided_experiment\`;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`challenges\`
        DROP COLUMN \`autonomous_challenge\`,
        DROP COLUMN \`guided_experiment\`,
        DROP COLUMN \`notion_key\`;
    `);
  }
}
