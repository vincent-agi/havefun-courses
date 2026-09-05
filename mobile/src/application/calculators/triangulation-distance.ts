export const TRIANGULATION_DISTANCE_FORMULA = 'triangulation-distance';

/**
 * Issue 1.17 — Meridienne de Delambre et Mechain (1792-1799).
 * A partir d'une seule base AB et des angles vises en A et en B, la loi des
 * sinus donne la distance AC = base * sin(B) / sin(A + B).
 */
export function computeTriangulationDistance(
  measurements: Record<string, number>,
): number | null {
  const { baseM, angleADeg, angleBDeg } = measurements;
  if (!baseM || !angleADeg || !angleBDeg || baseM <= 0) return null;
  if (angleADeg <= 0 || angleBDeg <= 0 || angleADeg + angleBDeg >= 180) {
    return null;
  }
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  return (baseM * Math.sin(toRad(angleBDeg))) / Math.sin(toRad(angleADeg + angleBDeg));
}
