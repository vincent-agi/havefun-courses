export const HEIGHT_FROM_ANGLE_FORMULA = 'height-from-angle';

/**
 * Issue 1.15 — Table des cordes d'Hipparque de Nicee ; Ptolemee, Almageste.
 * Hauteur inaccessible = distance * tan(angle d'elevation) + hauteur des yeux.
 */
export function computeHeightFromAngle(
  measurements: Record<string, number>,
): number | null {
  const { distanceM, elevationAngleDeg, eyeHeightM } = measurements;
  if (!distanceM || !elevationAngleDeg) return null;
  if (distanceM <= 0 || elevationAngleDeg <= 0 || elevationAngleDeg >= 90) {
    return null;
  }
  const eye = eyeHeightM ?? 0;
  if (eye < 0) return null;
  return distanceM * Math.tan((elevationAngleDeg * Math.PI) / 180) + eye;
}
