export const EPICENTRAL_DISTANCE_FORMULA = 'epicentral-distance';

/**
 * Issue 4.8 — Michell (1760, apres Lisbonne 1755) ; Milne (1880) ; Richter (1935).
 * Regle d'Omori : la distance a l'epicentre (km) est proche de 8 fois l'ecart
 * de temps d'arrivee entre l'onde lente (S) et l'onde rapide (P), en secondes.
 */
const OMORI_KM_PER_SECOND = 8;

export function computeEpicentralDistance(
  measurements: Record<string, number>,
): number | null {
  const { sMinusPSeconds } = measurements;
  if (!sMinusPSeconds || sMinusPSeconds <= 0) return null;
  return OMORI_KM_PER_SECOND * sMinusPSeconds;
}
