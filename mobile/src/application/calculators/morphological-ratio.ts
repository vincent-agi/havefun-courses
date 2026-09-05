export const MORPHOLOGICAL_RATIO_FORMULA = 'morphological-ratio';

/**
 * Issue 4.4 — Cuvier, Museum de Paris (1796) : realite de l'extinction.
 * Comparer une structure homologue entre une forme fossile et une forme
 * actuelle : rapport = mesure fossile / mesure actuelle (un ecart net et
 * constant signe une espece distincte).
 */
export function computeMorphologicalRatio(
  measurements: Record<string, number>,
): number | null {
  const { fossilMeasureMm, livingMeasureMm } = measurements;
  if (!fossilMeasureMm || !livingMeasureMm) return null;
  if (fossilMeasureMm <= 0 || livingMeasureMm <= 0) return null;
  return fossilMeasureMm / livingMeasureMm;
}
