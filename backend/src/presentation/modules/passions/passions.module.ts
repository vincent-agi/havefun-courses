import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { ListPassionsUseCase } from '../../../application/use-cases/passions/list-passions.use-case.js';
import { PassionsController } from '../../controllers/passions.controller.js';

@Module({
  imports: [PersistenceModule],
  controllers: [PassionsController],
  providers: [ListPassionsUseCase],
})
export class PassionsModule {}
