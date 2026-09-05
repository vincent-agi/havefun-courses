export const STRATUM_AGE_FORMULA = 'stratum-age';

/**
 * Issue 4.3 — Nicolas Steno, principe de superposition (Florence, 1667-1669).
 * En connaissant la vitesse de sedimentation, l'age d'une strate se deduit de
 * sa profondeur : age = profondeur / vitesse (converti en annees).
 */
export function computeStratumAge(
  measurements: Record<string, number>,
): number | null {
  const { depthCm, sedimentationRateCmPerCentury } = measurements;
  if (depthCm === undefined || !sedimentationRateCmPerCentury) return null;
  if (depthCm < 0 || sedimentationRateCmPerCentury <= 0) return null;
  return (depthCm / sedimentationRateCmPerCentury) * 100;
}
