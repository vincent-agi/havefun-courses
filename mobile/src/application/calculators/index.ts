import { THALES_SHADOW_RATIO_FORMULA } from '../../domain/entities/calculator-schema';
import { computeThalesShadowRatio } from './thales-shadow-ratio';
import { PI_FROM_CIRCLE_FORMULA, computePiFromCircle } from './pi-from-circle';
import {
  RECTANGLE_DIAGONAL_FORMULA,
  computeRectangleDiagonal,
} from './rectangle-diagonal';
import {
  FOURTH_PROPORTIONAL_FORMULA,
  computeFourthProportional,
} from './fourth-proportional';

type CalculatorFn = (measurements: Record<string, number>) => number | null;

const CALCULATORS: Record<string, CalculatorFn> = {
  [THALES_SHADOW_RATIO_FORMULA]: computeThalesShadowRatio,
  [PI_FROM_CIRCLE_FORMULA]: computePiFromCircle,
  [RECTANGLE_DIAGONAL_FORMULA]: computeRectangleDiagonal,
  [FOURTH_PROPORTIONAL_FORMULA]: computeFourthProportional,
};

export function getCalculator(formula: string): CalculatorFn | null {
  return CALCULATORS[formula] ?? null;
}
