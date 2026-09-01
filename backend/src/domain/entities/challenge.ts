import { SchoolLevel } from './school-level.js';
import { CalculatorSchema } from './calculator-schema.js';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  schoolLevel: SchoolLevel;
  durationMinutes: number;
  passionId: string;
  skillId: string;
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
  createdAt: Date;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
