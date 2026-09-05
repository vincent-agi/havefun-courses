import { CalculatorSchema } from '../../domain/entities/calculator-schema.js';
import {
  GuidedExperiment,
  AutonomousChallenge,
} from '../../domain/entities/challenge.js';
import { ChallengeSummaryDto } from './challenge-summary.dto.js';

export interface ChallengeDetailDto extends ChallengeSummaryDto {
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
  notionKey: string | null;
  guidedExperiment: GuidedExperiment | null;
  autonomousChallenge: AutonomousChallenge | null;
}
