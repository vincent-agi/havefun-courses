export const DISSOLVED_SOLIDS_FORMULA = 'dissolved-solids';

/**
 * Issue 3.2 — Joseph Black, "air fixe" (Edimbourg, 1754).
 * Evaporer une eau minerale laisse un residu sec : sa concentration
 * = masse du residu (mg) / volume evapore (L), en mg/L.
 */
export function computeDissolvedSolids(
  measurements: Record<string, number>,
): number | null {
  const { residueMassMg, sampleVolumeL } = measurements;
  if (residueMassMg === undefined || !sampleVolumeL) return null;
  if (residueMassMg < 0 || sampleVolumeL <= 0) return null;
  return residueMassMg / sampleVolumeL;
}
