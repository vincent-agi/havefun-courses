import {
  Challenge,
  ChallengeDetail,
  ChallengeFilters,
} from '../entities/challenge';

export interface ChallengeRepository {
  list(filters: ChallengeFilters): Promise<Challenge[]>;
  getDetail(id: string): Promise<ChallengeDetail>;
}
