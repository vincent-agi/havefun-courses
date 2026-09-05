import { SchoolLevel } from './school-level.js';
import { CalculatorSchema } from './calculator-schema.js';

/** Une étape numérotée du protocole guidé, avec sa question de réflexion. */
export interface ExperimentStep {
  instruction: string;
  /** Question à se poser à cette étape pour guider le raisonnement. */
  question?: string;
}

/** Expérience 1 : la plus simple des deux, guidée pas à pas. */
export interface GuidedExperiment {
  title: string;
  /** Ce que l'élève cherche à montrer. */
  goal: string;
  materials: string[];
  /** Schéma en art ASCII / légende, rendu en police à chasse fixe. */
  schema: string;
  steps: ExperimentStep[];
  /** Grandeurs / observations à relever. */
  measures: string[];
  /** Résultat attendu et son interprétation. */
  interpretation: string;
}

/** Expérience 2 : défi peu guidé, sur une situation différente mais de même notion. */
export interface AutonomousChallenge {
  title: string;
  /** Consigne claire, sans guidage pas à pas. */
  brief: string;
  schema: string;
  /** Critère de réussite communiqué à l'élève. */
  successCriteria: string;
}

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
  xpReward: number;
  createdAt: Date;
  /**
   * Clé de la notion : l'application mobile y associe un validateur d'expérience
   * spécifique. Absente = ancien parcours (calculateur générique).
   */
  notionKey: string | null;
  guidedExperiment: GuidedExperiment | null;
  autonomousChallenge: AutonomousChallenge | null;
}

export interface ChallengeFilters {
  schoolLevel?: SchoolLevel;
  passionId?: string;
  maxDurationMinutes?: number;
}
