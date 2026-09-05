export const EUCLIDEAN_REMAINDER_FORMULA = 'euclidean-remainder';

/**
 * Issue 1.4 — Reforme gregorienne du calendrier (1582).
 * Division euclidienne : le reste est ce que le calendrier doit "rattraper"
 * (ex. secondes d'une annee divisees par les 86 400 secondes d'un jour).
 */
export function computeEuclideanRemainder(
  measurements: Record<string, number>,
): number | null {
  const { dividend, divisor } = measurements;
  if (dividend === undefined || !divisor || divisor <= 0) return null;
  if (dividend < 0 || !Number.isFinite(dividend)) return null;
  return dividend % divisor;
}
