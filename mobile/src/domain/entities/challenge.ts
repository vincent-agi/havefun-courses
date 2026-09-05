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

/** Étape numérotée du protocole guidé, avec sa question de réflexion. */
export interface ExperimentStep {
  instruction: string;
  question?: string;
}

/** Expérience 1 : la plus simple des deux, guidée pas à pas. */
export interface GuidedExperiment {
  title: string;
  goal: string;
  materials: string[];
  /** Schéma ASCII, rendu en police à chasse fixe. */
  schema: string;
  steps: ExperimentStep[];
  measures: string[];
  interpretation: string;
}

/** Expérience 2 : défi peu guidé, situation différente mais même notion. */
export interface AutonomousChallenge {
  title: string;
  brief: string;
  schema: string;
  successCriteria: string;
}

export interface ChallengeDetail extends Challenge {
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
  /**
   * Clé de la notion. Si présente et connue de l'app, la mission suit le
   * parcours « expérience guidée + défi autonome » avec un validateur dédié.
   */
  notionKey?: string | null;
  guidedExperiment?: GuidedExperiment | null;
  autonomousChallenge?: AutonomousChallenge | null;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
