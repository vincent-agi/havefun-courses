export const GRAIN_COUNT_FORMULA = 'grain-count';

/**
 * Issue 1.13 — "L'Arenaire" d'Archimede.
 * Denombrer l'innombrable : nombre de grains = volume du tas * grains par cm3.
 * Le resultat s'exprime naturellement en puissances de 10.
 */
export function computeGrainCount(
  measurements: Record<string, number>,
): number | null {
  const { containerVolumeCm3, grainsPerCm3 } = measurements;
  if (!containerVolumeCm3 || !grainsPerCm3) return null;
  if (containerVolumeCm3 <= 0 || grainsPerCm3 <= 0) return null;
  return containerVolumeCm3 * grainsPerCm3;
}
