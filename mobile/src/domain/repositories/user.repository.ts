import { User } from '../entities/user';
import { SchoolLevel } from '../entities/school-level';
import { BadgeStatus } from '../entities/badge';
import { PassCompetences } from '../entities/pass-competences';

export interface UpdateOnboardingInput {
  schoolLevel: SchoolLevel;
  passionIds: string[];
}

export interface UserRepository {
  getCurrentUser(): Promise<User>;
  updateOnboarding(input: UpdateOnboardingInput): Promise<User>;
  getBadges(): Promise<BadgeStatus[]>;
  getPassCompetences(): Promise<PassCompetences>;
}
