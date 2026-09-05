export const TELESCOPE_MAGNIFICATION_FORMULA = 'telescope-magnification';

/**
 * Issue 2.13 — Lippershey (Middelbourg, 1608) ; Galilee ; Kepler.
 * Grossissement d'une lunette = distance focale de l'objectif / distance
 * focale de l'oculaire.
 */
export function computeTelescopeMagnification(
  measurements: Record<string, number>,
): number | null {
  const { objectiveFocalMm, eyepieceFocalMm } = measurements;
  if (!objectiveFocalMm || !eyepieceFocalMm) return null;
  if (objectiveFocalMm <= 0 || eyepieceFocalMm <= 0) return null;
  return objectiveFocalMm / eyepieceFocalMm;
}
