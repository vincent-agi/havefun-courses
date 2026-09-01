import { SchoolLevel } from './school-level.js';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  schoolLevel: SchoolLevel;
  durationMinutes: number;
  passionId: string;
  skillId: string;
  createdAt: Date;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
