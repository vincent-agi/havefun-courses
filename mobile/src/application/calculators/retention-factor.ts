export const RETENTION_FACTOR_FORMULA = 'retention-factor';

/**
 * Issue 3.5 — Mikhail Tsvet, chromatographie (Varsovie, 1900-1906).
 * Rapport frontal Rf = distance parcourue par le constituant / distance
 * parcourue par le solvant (entre 0 et 1). Deux taches de Rf differents
 * revelent un melange.
 */
export function computeRetentionFactor(
  measurements: Record<string, number>,
): number | null {
  const { soluteMigrationMm, solventFrontMm } = measurements;
  if (soluteMigrationMm === undefined || !solventFrontMm) return null;
  if (soluteMigrationMm < 0 || solventFrontMm <= 0) return null;
  if (soluteMigrationMm > solventFrontMm) return null;
  return soluteMigrationMm / solventFrontMm;
}
