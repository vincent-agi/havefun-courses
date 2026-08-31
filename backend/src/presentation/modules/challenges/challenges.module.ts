import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { ListChallengesUseCase } from '../../../application/use-cases/challenges/list-challenges.use-case.js';
import { ChallengesController } from '../../controllers/challenges.controller.js';

@Module({
  imports: [PersistenceModule],
  controllers: [ChallengesController],
  providers: [ListChallengesUseCase],
})
export class ChallengesModule {}
