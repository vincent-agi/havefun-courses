export const PI_FROM_CIRCLE_FORMULA = 'pi-from-circle';

/**
 * Issue 1.1 — Archimède, Syracuse (v. 250 av. J.-C.).
 * Le périmètre d'un disque est proportionnel à son diamètre ; le rapport est π.
 */
export function computePiFromCircle(
  measurements: Record<string, number>,
): number | null {
  const { perimeterM, diameterM } = measurements;
  if (!perimeterM || !diameterM || diameterM <= 0) return null;
  return perimeterM / diameterM;
}
