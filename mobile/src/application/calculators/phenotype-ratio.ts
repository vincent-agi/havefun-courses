export const PHENOTYPE_RATIO_FORMULA = 'phenotype-ratio';

/**
 * Issue 4.14 — Mendel, jardin du monastere de Brno (1856-1863).
 * A la deuxieme generation, le rapport (individus a caractere dominant) /
 * (individus a caractere recessif) se rapproche de 3.
 */
export function computePhenotypeRatio(
  measurements: Record<string, number>,
): number | null {
  const { dominantCount, recessiveCount } = measurements;
  if (dominantCount === undefined || !recessiveCount) return null;
  if (
    dominantCount < 0 ||
    recessiveCount <= 0 ||
    !Number.isInteger(dominantCount) ||
    !Number.isInteger(recessiveCount)
  ) {
    return null;
  }
  return dominantCount / recessiveCount;
}
