import { SchoolLevel } from './school-level';
import { Passion } from './passion';

export interface Skill {
  id: string;
  key: string;
  label: string;
  subject: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  schoolLevel: SchoolLevel;
  durationMinutes: number;
  passion: Passion;
  skill: Skill;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
