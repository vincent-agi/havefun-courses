import { Inject, Injectable } from '@nestjs/common';
import {
  type PassionRepository,
  PASSION_REPOSITORY,
} from '../../../domain/repositories/passion.repository.js';
import { Passion } from '../../../domain/entities/passion.js';

@Injectable()
export class ListPassionsUseCase {
  constructor(
    @Inject(PASSION_REPOSITORY)
    private readonly passionRepository: PassionRepository,
  ) {}

  execute(): Promise<Passion[]> {
    return this.passionRepository.findAll();
  }
}
