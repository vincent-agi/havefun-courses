export const PLANAR_DISTANCE_FORMULA = 'planar-distance';

/**
 * Issue 1.10 — Descartes, La Geometrie (Leyde, 1637).
 * Distance entre deux points d'un repere orthogonal : racine de dx^2 + dy^2.
 */
export function computePlanarDistance(
  measurements: Record<string, number>,
): number | null {
  const { x1, y1, x2, y2 } = measurements;
  if ([x1, y1, x2, y2].some(v => v === undefined || !Number.isFinite(v))) {
    return null;
  }
  return Math.hypot(x2 - x1, y2 - y1);
}
