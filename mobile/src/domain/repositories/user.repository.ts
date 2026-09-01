import { User } from '../entities/user';
import { SchoolLevel } from '../entities/school-level';

export interface UpdateOnboardingInput {
  schoolLevel: SchoolLevel;
  passionIds: string[];
}

export interface UserRepository {
  getCurrentUser(): Promise<User>;
  updateOnboarding(input: UpdateOnboardingInput): Promise<User>;
}
