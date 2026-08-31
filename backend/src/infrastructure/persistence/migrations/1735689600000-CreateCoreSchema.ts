import { MigrationInterface, QueryRunner } from 'typeorm';

const SCHOOL_LEVELS = "'6e','5e','4e','3e','2nde','1re','terminale'";
const SUBMISSION_STATUSES = "'pending','validated','rejected'";

export class CreateCoreSchema1735689600000 implements MigrationInterface {
  name = 'CreateCoreSchema1735689600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`passions\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`key\` VARCHAR(50) NOT NULL,
        \`label\` VARCHAR(100) NOT NULL,
        \`icon\` VARCHAR(10) NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_passions_key\` (\`key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`skills\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`key\` VARCHAR(50) NOT NULL,
        \`label\` VARCHAR(100) NOT NULL,
        \`subject\` VARCHAR(50) NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_skills_key\` (\`key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`badges\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`key\` VARCHAR(50) NOT NULL,
        \`label\` VARCHAR(100) NOT NULL,
        \`description\` TEXT NOT NULL,
        \`icon_url\` VARCHAR(255) NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_badges_key\` (\`key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`email\` VARCHAR(255) NOT NULL,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`first_name\` VARCHAR(100) NOT NULL,
        \`school_level\` ENUM(${SCHOOL_LEVELS}) NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_users_email\` (\`email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`user_passions\` (
        \`user_id\` CHAR(36) NOT NULL,
        \`passion_id\` CHAR(36) NOT NULL,
        PRIMARY KEY (\`user_id\`, \`passion_id\`),
        CONSTRAINT \`FK_user_passions_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_user_passions_passion\` FOREIGN KEY (\`passion_id\`) REFERENCES \`passions\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`challenges\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`title\` VARCHAR(150) NOT NULL,
        \`description\` TEXT NOT NULL,
        \`school_level\` ENUM(${SCHOOL_LEVELS}) NOT NULL,
        \`duration_minutes\` INT NOT NULL,
        \`passion_id\` CHAR(36) NOT NULL,
        \`skill_id\` CHAR(36) NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_challenges_passion\` FOREIGN KEY (\`passion_id\`) REFERENCES \`passions\` (\`id\`) ON DELETE RESTRICT,
        CONSTRAINT \`FK_challenges_skill\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skills\` (\`id\`) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`submissions\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`user_id\` CHAR(36) NOT NULL,
        \`challenge_id\` CHAR(36) NOT NULL,
        \`status\` ENUM(${SUBMISSION_STATUSES}) NOT NULL DEFAULT 'pending',
        \`media_url\` VARCHAR(500) NULL,
        \`submitted_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`validated_at\` DATETIME NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_submissions_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_submissions_challenge\` FOREIGN KEY (\`challenge_id\`) REFERENCES \`challenges\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      CREATE TABLE \`user_badges\` (
        \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
        \`user_id\` CHAR(36) NOT NULL,
        \`badge_id\` CHAR(36) NOT NULL,
        \`earned_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_user_badges_user_badge\` (\`user_id\`, \`badge_id\`),
        CONSTRAINT \`FK_user_badges_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_user_badges_badge\` FOREIGN KEY (\`badge_id\`) REFERENCES \`badges\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user_badges`;');
    await queryRunner.query('DROP TABLE `submissions`;');
    await queryRunner.query('DROP TABLE `challenges`;');
    await queryRunner.query('DROP TABLE `user_passions`;');
    await queryRunner.query('DROP TABLE `users`;');
    await queryRunner.query('DROP TABLE `badges`;');
    await queryRunner.query('DROP TABLE `skills`;');
    await queryRunner.query('DROP TABLE `passions`;');
  }
}
