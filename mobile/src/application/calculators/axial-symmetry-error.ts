export const AXIAL_SYMMETRY_ERROR_FORMULA = 'axial-symmetry-error';

/**
 * Issue 1.5 — Pavages de l'Alhambra, Grenade (XIVe s.).
 * La symetrie axiale conserve la distance a l'axe : l'ecart entre la distance
 * du point et celle de son image mesure la qualite du trace (0 = parfait).
 */
export function computeAxialSymmetryError(
  measurements: Record<string, number>,
): number | null {
  const { pointDistanceToAxisM, imageDistanceToAxisM } = measurements;
  if (
    pointDistanceToAxisM === undefined ||
    imageDistanceToAxisM === undefined ||
    pointDistanceToAxisM < 0 ||
    imageDistanceToAxisM < 0
  ) {
    return null;
  }
  return Math.abs(pointDistanceToAxisM - imageDistanceToAxisM);
}
