import { CalculatorSchema } from '../../domain/entities/calculator-schema.js';
import { ChallengeSummaryDto } from './challenge-summary.dto.js';

export interface ChallengeDetailDto extends ChallengeSummaryDto {
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
}
