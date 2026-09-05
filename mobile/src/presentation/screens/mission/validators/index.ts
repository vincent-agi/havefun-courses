import type React from 'react';
import { ExperimentValidatorProps } from './shared';
import { PiCircleRatioValidator } from './PiCircleRatioValidator';
import { DensityFloatValidator } from './DensityFloatValidator';
import { MassConservationValidator } from './MassConservationValidator';
import { OutbreakSourceValidator } from './OutbreakSourceValidator';
import { EarthShadowValidator } from './EarthShadowValidator';
import { AirOxygenValidator } from './AirOxygenValidator';
import { PlantMatterValidator } from './PlantMatterValidator';
import { ShadowStraightLineValidator } from './ShadowStraightLineValidator';
import { MeltingPlateauValidator } from './MeltingPlateauValidator';
import { MendelRatioValidator } from './MendelRatioValidator';
import { PythagorasValidator } from './PythagorasValidator';
import { Co2LimewaterValidator } from './Co2LimewaterValidator';
import { EarthwormBurialValidator } from './EarthwormBurialValidator';
import { DiskAreaExhaustionValidator } from './DiskAreaExhaustionValidator';
import { WeightVsMassValidator } from './WeightVsMassValidator';
import { RespirationCo2Validator } from './RespirationCo2Validator';

/**
 * Un validateur d'expérience par notion (forme et fond spécifiques).
 * La clé correspond au `notionKey` renvoyé par l'API pour la mission.
 */
const VALIDATORS: Record<
  string,
  React.ComponentType<ExperimentValidatorProps>
> = {
  'pi-circle-ratio': PiCircleRatioValidator,
  'density-floats': DensityFloatValidator,
  'mass-conservation': MassConservationValidator,
  'outbreak-source': OutbreakSourceValidator,
  'earth-shadow': EarthShadowValidator,
  'air-oxygen-fraction': AirOxygenValidator,
  'plant-matter-origin': PlantMatterValidator,
  'shadow-straight-line': ShadowStraightLineValidator,
  'melting-plateau': MeltingPlateauValidator,
  'mendel-ratio': MendelRatioValidator,
  'pythagoras-3-4-5': PythagorasValidator,
  'co2-limewater': Co2LimewaterValidator,
  'earthworm-burial': EarthwormBurialValidator,
  'disk-area-exhaustion': DiskAreaExhaustionValidator,
  'weight-vs-mass': WeightVsMassValidator,
  'respiration-co2': RespirationCo2Validator,
};

export function getExperimentValidator(
  notionKey: string | null | undefined,
): React.ComponentType<ExperimentValidatorProps> | null {
  if (!notionKey) return null;
  return VALIDATORS[notionKey] ?? null;
}

export type { ExperimentValidatorProps };
