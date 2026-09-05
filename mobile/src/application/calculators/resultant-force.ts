export const RESULTANT_FORCE_FORMULA = 'resultant-force';

/**
 * Issue 2.15 — Stevin (1586) ; Newton, Principia (1687).
 * Composition de deux forces perpendiculaires : la resultante a pour valeur
 * la racine de fx^2 + fy^2 (regle du parallelogramme).
 */
export function computeResultantForce(
  measurements: Record<string, number>,
): number | null {
  const { forceXN, forceYN } = measurements;
  if (
    forceXN === undefined ||
    forceYN === undefined ||
    !Number.isFinite(forceXN) ||
    !Number.isFinite(forceYN)
  ) {
    return null;
  }
  return Math.hypot(forceXN, forceYN);
}
