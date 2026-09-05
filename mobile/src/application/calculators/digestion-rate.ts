export const DIGESTION_RATE_FORMULA = 'digestion-rate';

/**
 * Issue 4.11 — Spallanzani (Pavie, v. 1780) ; Beaumont (Fort Mackinac, 1822-1833).
 * La digestion est une transformation chimique : vitesse = fraction d'amidon
 * transformee / duree (min). Nulle sans salive ou a froid.
 */
export function computeDigestionRate(
  measurements: Record<string, number>,
): number | null {
  const { transformedFraction, durationMin } = measurements;
  if (transformedFraction === undefined || !durationMin) return null;
  if (
    transformedFraction < 0 ||
    transformedFraction > 1 ||
    durationMin <= 0
  ) {
    return null;
  }
  return transformedFraction / durationMin;
}
