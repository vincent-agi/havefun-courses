import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissionAndSubmissionDetails1735776000000 implements MigrationInterface {
  name = 'AddMissionAndSubmissionDetails1735776000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`challenges\`
        ADD COLUMN \`narrative_intro\` TEXT NOT NULL AFTER \`description\`,
        ADD COLUMN \`theory_explanation\` TEXT NOT NULL AFTER \`narrative_intro\`,
        ADD COLUMN \`calculator_schema\` JSON NOT NULL AFTER \`theory_explanation\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`submissions\`
        ADD COLUMN \`measurements\` JSON NULL AFTER \`media_url\`,
        ADD COLUMN \`result\` FLOAT NULL AFTER \`measurements\`,
        ADD COLUMN \`sensor_data\` JSON NULL AFTER \`result\`;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`submissions\`
        DROP COLUMN \`sensor_data\`,
        DROP COLUMN \`result\`,
        DROP COLUMN \`measurements\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`challenges\`
        DROP COLUMN \`calculator_schema\`,
        DROP COLUMN \`theory_explanation\`,
        DROP COLUMN \`narrative_intro\`;
    `);
  }
}
