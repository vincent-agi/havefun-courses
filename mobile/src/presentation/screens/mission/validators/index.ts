import type React from 'react';
import { ExperimentValidatorProps } from './shared';
import { PiCircleRatioValidator } from './PiCircleRatioValidator';
import { DensityFloatValidator } from './DensityFloatValidator';
import { MassConservationValidator } from './MassConservationValidator';
import { OutbreakSourceValidator } from './OutbreakSourceValidator';

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
};

export function getExperimentValidator(
  notionKey: string | null | undefined,
): React.ComponentType<ExperimentValidatorProps> | null {
  if (!notionKey) return null;
  return VALIDATORS[notionKey] ?? null;
}

export type { ExperimentValidatorProps };
