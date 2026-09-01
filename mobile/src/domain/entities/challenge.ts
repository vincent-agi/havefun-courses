import { SchoolLevel } from './school-level';
import { Passion } from './passion';
import { CalculatorSchema } from './calculator-schema';

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

export interface ChallengeDetail extends Challenge {
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
