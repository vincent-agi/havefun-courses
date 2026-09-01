import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { GetCurrentUserUseCase } from '../../../application/use-cases/users/get-current-user.use-case.js';
import { UpdateOnboardingUseCase } from '../../../application/use-cases/users/update-onboarding.use-case.js';
import { ListUserBadgesUseCase } from '../../../application/use-cases/users/list-user-badges.use-case.js';
import { GetPassCompetencesUseCase } from '../../../application/use-cases/users/get-pass-competences.use-case.js';
import { GeneratePassCompetencesPdfUseCase } from '../../../application/use-cases/users/generate-pass-competences-pdf.use-case.js';
import { UsersController } from '../../controllers/users.controller.js';

@Module({
  imports: [PersistenceModule],
  controllers: [UsersController],
  providers: [
    GetCurrentUserUseCase,
    UpdateOnboardingUseCase,
    ListUserBadgesUseCase,
    GetPassCompetencesUseCase,
    GeneratePassCompetencesPdfUseCase,
  ],
})
export class UsersModule {}
