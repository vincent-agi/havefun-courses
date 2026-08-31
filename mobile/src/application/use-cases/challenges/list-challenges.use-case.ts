import { ChallengeRepository } from '../../../domain/repositories/challenge.repository';
import {
  Challenge,
  ChallengeFilters,
} from '../../../domain/entities/challenge';

export class ListChallengesUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  execute(filters: ChallengeFilters): Promise<Challenge[]> {
    return this.challengeRepository.list(filters);
  }
}
