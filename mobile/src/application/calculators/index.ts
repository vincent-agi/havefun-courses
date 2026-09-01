import { THALES_SHADOW_RATIO_FORMULA } from '../../domain/entities/calculator-schema';
import { computeThalesShadowRatio } from './thales-shadow-ratio';

type CalculatorFn = (measurements: Record<string, number>) => number | null;

const CALCULATORS: Record<string, CalculatorFn> = {
  [THALES_SHADOW_RATIO_FORMULA]: computeThalesShadowRatio,
};

export function getCalculator(formula: string): CalculatorFn | null {
  return CALCULATORS[formula] ?? null;
}
