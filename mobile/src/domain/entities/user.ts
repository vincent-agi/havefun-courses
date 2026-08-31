import { SchoolLevel } from './school-level';

export interface User {
  id: string;
  email: string;
  firstName: string;
  schoolLevel: SchoolLevel | null;
  passionIds: string[];
}

export function isOnboardingComplete(user: User): boolean {
  return user.schoolLevel !== null && user.passionIds.length > 0;
}
