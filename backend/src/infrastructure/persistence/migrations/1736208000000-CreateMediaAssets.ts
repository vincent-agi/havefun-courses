import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMediaAssets1736208000000 implements MigrationInterface {
  name = 'CreateMediaAssets1736208000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`media_assets\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`owner_id\` CHAR(36) NOT NULL,
        \`mime_type\` VARCHAR(64) NOT NULL,
        \`size_bytes\` INT NOT NULL,
        \`storage_path\` VARCHAR(512) NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_media_assets_owner\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `media_assets`;');
  }
}
