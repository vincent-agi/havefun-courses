import { PassionRepository } from '../../../domain/repositories/passion.repository';
import { Passion } from '../../../domain/entities/passion';

export class ListPassionsUseCase {
  constructor(private readonly passionRepository: PassionRepository) {}

  execute(): Promise<Passion[]> {
    return this.passionRepository.list();
  }
}
