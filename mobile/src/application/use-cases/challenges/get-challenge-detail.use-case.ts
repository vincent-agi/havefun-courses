import { ChallengeRepository } from '../../../domain/repositories/challenge.repository';
import { ChallengeDetail } from '../../../domain/entities/challenge';

export class GetChallengeDetailUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  execute(id: string): Promise<ChallengeDetail> {
    return this.challengeRepository.getDetail(id);
  }
}
