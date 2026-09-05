export const COMBUSTION_DURATION_FORMULA = 'combustion-duration';

/**
 * Issue 3.9 — Lavoisier contre le phlogistique.
 * Une bougie sous cloche s'eteint quand le dioxygene est epuise : la duree de
 * combustion est proportionnelle au volume d'air disponible.
 */
export function computeCombustionDuration(
  measurements: Record<string, number>,
): number | null {
  const { referenceVolumeMl, referenceTimeS, targetVolumeMl } = measurements;
  if (!referenceVolumeMl || !referenceTimeS || !targetVolumeMl) return null;
  if (referenceVolumeMl <= 0 || referenceTimeS <= 0 || targetVolumeMl <= 0) {
    return null;
  }
  return (referenceTimeS * targetVolumeMl) / referenceVolumeMl;
}
