export const VOLUME_CONTRACTION_FORMULA = 'volume-contraction';

/**
 * Issue 3.8 — Democrite (Abdere) ; Dalton (Manchester, 1808) ; Perrin (1908).
 * En melangeant deux liquides (eau + alcool), le volume total est inferieur a
 * la somme : contraction = (V1 + V2) - V(melange), signe que la matiere est
 * faite de grains separes par du vide.
 */
export function computeVolumeContraction(
  measurements: Record<string, number>,
): number | null {
  const { volumeAMl, volumeBMl, mixedVolumeMl } = measurements;
  if (!volumeAMl || !volumeBMl || !mixedVolumeMl) return null;
  if (volumeAMl <= 0 || volumeBMl <= 0 || mixedVolumeMl <= 0) return null;
  return volumeAMl + volumeBMl - mixedVolumeMl;
}
