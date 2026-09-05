export const PYTHAGOREAN_HYPOTENUSE_FORMULA = 'pythagorean-hypotenuse';

/**
 * Issue 1.11 — Tablette Plimpton 322 (Babylone) et ecole pythagoricienne (Crotone).
 * Dans un triangle rectangle : hypotenuse = racine de a^2 + b^2.
 */
export function computePythagoreanHypotenuse(
  measurements: Record<string, number>,
): number | null {
  const { legAM, legBM } = measurements;
  if (!legAM || !legBM || legAM <= 0 || legBM <= 0) return null;
  return Math.sqrt(legAM * legAM + legBM * legBM);
}
