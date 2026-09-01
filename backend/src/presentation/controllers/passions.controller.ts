import { Controller, Get } from '@nestjs/common';
import { ListPassionsUseCase } from '../../application/use-cases/passions/list-passions.use-case.js';
import { Passion } from '../../domain/entities/passion.js';

@Controller('passions')
export class PassionsController {
  constructor(private readonly listPassionsUseCase: ListPassionsUseCase) {}

  @Get()
  list(): Promise<Passion[]> {
    return this.listPassionsUseCase.execute();
  }
}
