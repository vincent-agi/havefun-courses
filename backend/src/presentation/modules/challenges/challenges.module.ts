import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { ListChallengesUseCase } from '../../../application/use-cases/challenges/list-challenges.use-case.js';
import { GetChallengeDetailUseCase } from '../../../application/use-cases/challenges/get-challenge-detail.use-case.js';
import { CreateSubmissionUseCase } from '../../../application/use-cases/challenges/create-submission.use-case.js';
import { ListMySubmissionsUseCase } from '../../../application/use-cases/challenges/list-my-submissions.use-case.js';
import { ChallengesController } from '../../controllers/challenges.controller.js';
import { SubmissionsController } from '../../controllers/submissions.controller.js';

@Module({
  imports: [PersistenceModule],
  controllers: [ChallengesController, SubmissionsController],
  providers: [
    ListChallengesUseCase,
    GetChallengeDetailUseCase,
    CreateSubmissionUseCase,
    ListMySubmissionsUseCase,
  ],
})
export class ChallengesModule {}
