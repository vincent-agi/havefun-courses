import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormEntities } from './orm-entities/index.js';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.js';
import { PASSION_REPOSITORY } from '../../domain/repositories/passion.repository.js';
import { CHALLENGE_REPOSITORY } from '../../domain/repositories/challenge.repository.js';
import { SKILL_REPOSITORY } from '../../domain/repositories/skill.repository.js';
import { SUBMISSION_REPOSITORY } from '../../domain/repositories/submission.repository.js';
import { TypeOrmUserRepository } from './repositories/typeorm-user.repository.js';
import { TypeOrmPassionRepository } from './repositories/typeorm-passion.repository.js';
import { TypeOrmChallengeRepository } from './repositories/typeorm-challenge.repository.js';
import { TypeOrmSkillRepository } from './repositories/typeorm-skill.repository.js';
import { TypeOrmSubmissionRepository } from './repositories/typeorm-submission.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature(ormEntities)],
  providers: [
    { provide: USER_REPOSITORY, useClass: TypeOrmUserRepository },
    { provide: PASSION_REPOSITORY, useClass: TypeOrmPassionRepository },
    { provide: CHALLENGE_REPOSITORY, useClass: TypeOrmChallengeRepository },
    { provide: SKILL_REPOSITORY, useClass: TypeOrmSkillRepository },
    { provide: SUBMISSION_REPOSITORY, useClass: TypeOrmSubmissionRepository },
  ],
  exports: [
    USER_REPOSITORY,
    PASSION_REPOSITORY,
    CHALLENGE_REPOSITORY,
    SKILL_REPOSITORY,
    SUBMISSION_REPOSITORY,
  ],
})
export class PersistenceModule {}
