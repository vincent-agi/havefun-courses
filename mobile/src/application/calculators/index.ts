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
import {
  SQUARE_DIAGONAL_FORMULA,
  computeSquareDiagonal,
} from './square-diagonal';
import {
  HEIGHT_FROM_ANGLE_FORMULA,
  computeHeightFromAngle,
} from './height-from-angle';
import { AVERAGE_SPEED_FORMULA, computeAverageSpeed } from './average-speed';
import {
  TRIANGULATION_DISTANCE_FORMULA,
  computeTriangulationDistance,
} from './triangulation-distance';
import {
  EQUIPROBABILITY_FORMULA,
  computeEquiprobability,
} from './equiprobability';
import {
  RELATIVE_VELOCITY_FORMULA,
  computeRelativeVelocity,
} from './relative-velocity';
import {
  ACCELERATION_FROM_DROP_FORMULA,
  computeAccelerationFromDrop,
} from './acceleration-from-drop';
import {
  WEIGHT_FROM_MASS_FORMULA,
  computeWeightFromMass,
} from './weight-from-mass';
import { DENSITY_FORMULA, computeDensity } from './density';
import { SCALE_MODEL_FORMULA, computeScaleModel } from './scale-model';
import {
  SUN_ELEVATION_FROM_SHADOW_FORMULA,
  computeSunElevationFromShadow,
} from './sun-elevation-from-shadow';
import {
  PINHOLE_IMAGE_SIZE_FORMULA,
  computePinholeImageSize,
} from './pinhole-image-size';
import {
  ILLUMINATED_FRACTION_FORMULA,
  computeIlluminatedFraction,
} from './illuminated-fraction';
import { PILE_VOLTAGE_FORMULA, computePileVoltage } from './pile-voltage';
import {
  BRANCH_CURRENT_SUM_FORMULA,
  computeBranchCurrentSum,
} from './branch-current-sum';
import { OHM_RESISTANCE_FORMULA, computeOhmResistance } from './ohm-resistance';
import {
  GRATING_WAVELENGTH_FORMULA,
  computeGratingWavelength,
} from './grating-wavelength';
import {
  TELESCOPE_MAGNIFICATION_FORMULA,
  computeTelescopeMagnification,
} from './telescope-magnification';
import {
  LIGHT_TRAVEL_TIME_FORMULA,
  computeLightTravelTime,
} from './light-travel-time';
import {
  RESULTANT_FORCE_FORMULA,
  computeResultantForce,
} from './resultant-force';
import { KINETIC_ENERGY_FORMULA, computeKineticEnergy } from './kinetic-energy';
import {
  MIXTURE_TEMPERATURE_FORMULA,
  computeMixtureTemperature,
} from './mixture-temperature';
import {
  DISSOLVED_SOLIDS_FORMULA,
  computeDissolvedSolids,
} from './dissolved-solids';
import {
  DISTILLATION_YIELD_FORMULA,
  computeDistillationYield,
} from './distillation-yield';
import { SOLUTION_MASS_FORMULA, computeSolutionMass } from './solution-mass';
import {
  RETENTION_FACTOR_FORMULA,
  computeRetentionFactor,
} from './retention-factor';
import { MASS_BALANCE_FORMULA, computeMassBalance } from './mass-balance';
import {
  OXYGEN_FRACTION_FORMULA,
  computeOxygenFraction,
} from './oxygen-fraction';
import {
  VOLUME_CONTRACTION_FORMULA,
  computeVolumeContraction,
} from './volume-contraction';
import {
  COMBUSTION_DURATION_FORMULA,
  computeCombustionDuration,
} from './combustion-duration';
import {
  CONSERVED_PRODUCT_MASS_FORMULA,
  computeConservedProductMass,
} from './conserved-product-mass';
import {
  ELECTROLYSIS_GAS_RATIO_FORMULA,
  computeElectrolysisGasRatio,
} from './electrolysis-gas-ratio';
import {
  OXIDATION_MASS_GAIN_FORMULA,
  computeOxidationMassGain,
} from './oxidation-mass-gain';
import { DILUTED_ACID_PH_FORMULA, computeDilutedAcidPh } from './diluted-acid-ph';
import {
  CONDUCTIVITY_RATIO_FORMULA,
  computeConductivityRatio,
} from './conductivity-ratio';
import { CELL_SIZE_FORMULA, computeCellSize } from './cell-size';
import {
  SHARED_TRAIT_RATIO_FORMULA,
  computeSharedTraitRatio,
} from './shared-trait-ratio';
import { STRATUM_AGE_FORMULA, computeStratumAge } from './stratum-age';
import {
  MORPHOLOGICAL_RATIO_FORMULA,
  computeMorphologicalRatio,
} from './morphological-ratio';
import {
  PLANT_MASS_GAIN_FORMULA,
  computePlantMassGain,
} from './plant-mass-gain';
import { BURIAL_RATE_FORMULA, computeBurialRate } from './burial-rate';
import {
  DOUGH_RISE_RATIO_FORMULA,
  computeDoughRiseRatio,
} from './dough-rise-ratio';
import {
  EPICENTRAL_DISTANCE_FORMULA,
  computeEpicentralDistance,
} from './epicentral-distance';
import {
  LAVA_FLOW_SPEED_FORMULA,
  computeLavaFlowSpeed,
} from './lava-flow-speed';
import {
  VENTILATION_RATE_FORMULA,
  computeVentilationRate,
} from './ventilation-rate';
import { DIGESTION_RATE_FORMULA, computeDigestionRate } from './digestion-rate';
import { ATTACK_RATE_FORMULA, computeAttackRate } from './attack-rate';
import {
  PHOTOSYNTHESIS_BUBBLE_RATE_FORMULA,
  computePhotosynthesisBubbleRate,
} from './photosynthesis-bubble-rate';
import {
  PHENOTYPE_RATIO_FORMULA,
  computePhenotypeRatio,
} from './phenotype-ratio';

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
  [SQUARE_DIAGONAL_FORMULA]: computeSquareDiagonal,
  [HEIGHT_FROM_ANGLE_FORMULA]: computeHeightFromAngle,
  [AVERAGE_SPEED_FORMULA]: computeAverageSpeed,
  [TRIANGULATION_DISTANCE_FORMULA]: computeTriangulationDistance,
  [EQUIPROBABILITY_FORMULA]: computeEquiprobability,
  [RELATIVE_VELOCITY_FORMULA]: computeRelativeVelocity,
  [ACCELERATION_FROM_DROP_FORMULA]: computeAccelerationFromDrop,
  [WEIGHT_FROM_MASS_FORMULA]: computeWeightFromMass,
  [DENSITY_FORMULA]: computeDensity,
  [SCALE_MODEL_FORMULA]: computeScaleModel,
  [SUN_ELEVATION_FROM_SHADOW_FORMULA]: computeSunElevationFromShadow,
  [PINHOLE_IMAGE_SIZE_FORMULA]: computePinholeImageSize,
  [ILLUMINATED_FRACTION_FORMULA]: computeIlluminatedFraction,
  [PILE_VOLTAGE_FORMULA]: computePileVoltage,
  [BRANCH_CURRENT_SUM_FORMULA]: computeBranchCurrentSum,
  [OHM_RESISTANCE_FORMULA]: computeOhmResistance,
  [GRATING_WAVELENGTH_FORMULA]: computeGratingWavelength,
  [TELESCOPE_MAGNIFICATION_FORMULA]: computeTelescopeMagnification,
  [LIGHT_TRAVEL_TIME_FORMULA]: computeLightTravelTime,
  [RESULTANT_FORCE_FORMULA]: computeResultantForce,
  [KINETIC_ENERGY_FORMULA]: computeKineticEnergy,
  [MIXTURE_TEMPERATURE_FORMULA]: computeMixtureTemperature,
  [DISSOLVED_SOLIDS_FORMULA]: computeDissolvedSolids,
  [DISTILLATION_YIELD_FORMULA]: computeDistillationYield,
  [SOLUTION_MASS_FORMULA]: computeSolutionMass,
  [RETENTION_FACTOR_FORMULA]: computeRetentionFactor,
  [MASS_BALANCE_FORMULA]: computeMassBalance,
  [OXYGEN_FRACTION_FORMULA]: computeOxygenFraction,
  [VOLUME_CONTRACTION_FORMULA]: computeVolumeContraction,
  [COMBUSTION_DURATION_FORMULA]: computeCombustionDuration,
  [CONSERVED_PRODUCT_MASS_FORMULA]: computeConservedProductMass,
  [ELECTROLYSIS_GAS_RATIO_FORMULA]: computeElectrolysisGasRatio,
  [OXIDATION_MASS_GAIN_FORMULA]: computeOxidationMassGain,
  [DILUTED_ACID_PH_FORMULA]: computeDilutedAcidPh,
  [CONDUCTIVITY_RATIO_FORMULA]: computeConductivityRatio,
  [CELL_SIZE_FORMULA]: computeCellSize,
  [SHARED_TRAIT_RATIO_FORMULA]: computeSharedTraitRatio,
  [STRATUM_AGE_FORMULA]: computeStratumAge,
  [MORPHOLOGICAL_RATIO_FORMULA]: computeMorphologicalRatio,
  [PLANT_MASS_GAIN_FORMULA]: computePlantMassGain,
  [BURIAL_RATE_FORMULA]: computeBurialRate,
  [DOUGH_RISE_RATIO_FORMULA]: computeDoughRiseRatio,
  [EPICENTRAL_DISTANCE_FORMULA]: computeEpicentralDistance,
  [LAVA_FLOW_SPEED_FORMULA]: computeLavaFlowSpeed,
  [VENTILATION_RATE_FORMULA]: computeVentilationRate,
  [DIGESTION_RATE_FORMULA]: computeDigestionRate,
  [ATTACK_RATE_FORMULA]: computeAttackRate,
  [PHOTOSYNTHESIS_BUBBLE_RATE_FORMULA]: computePhotosynthesisBubbleRate,
  [PHENOTYPE_RATIO_FORMULA]: computePhenotypeRatio,
};

export function getCalculator(formula: string): CalculatorFn | null {
  return CALCULATORS[formula] ?? null;
}
