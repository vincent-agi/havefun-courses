export const DOUGH_RISE_RATIO_FORMULA = 'dough-rise-ratio';

/**
 * Issue 4.7 — Appert (Massy, v. 1795-1810) ; Pasteur, fermentations (1857).
 * Les micro-organismes (levure) font lever la pate : coefficient de levee
 * = hauteur finale / hauteur initiale (1 = pas de levee, sans levure).
 */
export function computeDoughRiseRatio(
  measurements: Record<string, number>,
): number | null {
  const { finalHeightMm, initialHeightMm } = measurements;
  if (!finalHeightMm || !initialHeightMm) return null;
  if (finalHeightMm <= 0 || initialHeightMm <= 0) return null;
  if (finalHeightMm < initialHeightMm) return null;
  return finalHeightMm / initialHeightMm;
}
