import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { GetCurrentUserUseCase } from '../../../application/use-cases/users/get-current-user.use-case.js';
import { UpdateOnboardingUseCase } from '../../../application/use-cases/users/update-onboarding.use-case.js';
import { UsersController } from '../../controllers/users.controller.js';

@Module({
  imports: [PersistenceModule],
  controllers: [UsersController],
  providers: [GetCurrentUserUseCase, UpdateOnboardingUseCase],
})
export class UsersModule {}
