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
import {
  EUCLIDEAN_REMAINDER_FORMULA,
  computeEuclideanRemainder,
} from './euclidean-division';
import {
  AXIAL_SYMMETRY_ERROR_FORMULA,
  computeAxialSymmetryError,
} from './axial-symmetry-error';
import { DISK_AREA_FORMULA, computeDiskArea } from './disk-area';
import { NET_BALANCE_FORMULA, computeNetBalance } from './net-balance';
import {
  LOWEST_COMMON_MULTIPLE_FORMULA,
  computeLowestCommonMultiple,
} from './lowest-common-multiple';
import {
  EARTH_CIRCUMFERENCE_FORMULA,
  computeEarthCircumference,
} from './earth-circumference';
import {
  PLANAR_DISTANCE_FORMULA,
  computePlanarDistance,
} from './planar-distance';
import {
  PYTHAGOREAN_HYPOTENUSE_FORMULA,
  computePythagoreanHypotenuse,
} from './pythagorean-hypotenuse';
import { GRAIN_COUNT_FORMULA, computeGrainCount } from './grain-count';

type CalculatorFn = (measurements: Record<string, number>) => number | null;

const CALCULATORS: Record<string, CalculatorFn> = {
  [THALES_SHADOW_RATIO_FORMULA]: computeThalesShadowRatio,
  [PI_FROM_CIRCLE_FORMULA]: computePiFromCircle,
  [RECTANGLE_DIAGONAL_FORMULA]: computeRectangleDiagonal,
  [FOURTH_PROPORTIONAL_FORMULA]: computeFourthProportional,
  [EUCLIDEAN_REMAINDER_FORMULA]: computeEuclideanRemainder,
  [AXIAL_SYMMETRY_ERROR_FORMULA]: computeAxialSymmetryError,
  [DISK_AREA_FORMULA]: computeDiskArea,
  [NET_BALANCE_FORMULA]: computeNetBalance,
  [LOWEST_COMMON_MULTIPLE_FORMULA]: computeLowestCommonMultiple,
  [EARTH_CIRCUMFERENCE_FORMULA]: computeEarthCircumference,
  [PLANAR_DISTANCE_FORMULA]: computePlanarDistance,
  [PYTHAGOREAN_HYPOTENUSE_FORMULA]: computePythagoreanHypotenuse,
  [GRAIN_COUNT_FORMULA]: computeGrainCount,
};

export function getCalculator(formula: string): CalculatorFn | null {
  return CALCULATORS[formula] ?? null;
}
