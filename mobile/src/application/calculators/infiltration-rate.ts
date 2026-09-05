export const INFILTRATION_RATE_FORMULA = 'infiltration-rate';

/**
 * Issue 4.20 — Boussingault (Bechelbronn, 1834) ; Liebig (Giessen, 1840).
 * Test d'infiltration : vitesse a laquelle un sol absorbe l'eau
 * = volume verse / temps d'infiltration (mL/s). Un sol fertile est permeable.
 */
export function computeInfiltrationRate(
  measurements: Record<string, number>,
): number | null {
  const { waterVolumeMl, infiltrationTimeS } = measurements;
  if (!waterVolumeMl || !infiltrationTimeS) return null;
  if (waterVolumeMl <= 0 || infiltrationTimeS <= 0) return null;
  return waterVolumeMl / infiltrationTimeS;
}
