import { Challenge, ChallengeFilters } from '../entities/challenge.js';

export const CHALLENGE_REPOSITORY = Symbol('CHALLENGE_REPOSITORY');

export interface ChallengeRepository {
  findMany(filters: ChallengeFilters): Promise<Challenge[]>;
  findById(id: string): Promise<Challenge | null>;
}
