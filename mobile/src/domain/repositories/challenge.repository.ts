import { Challenge, ChallengeFilters } from '../entities/challenge';

export interface ChallengeRepository {
  list(filters: ChallengeFilters): Promise<Challenge[]>;
}
