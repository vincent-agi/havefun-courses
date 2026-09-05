export const DILUTED_ACID_PH_FORMULA = 'diluted-acid-ph';

/**
 * Issue 3.13 — Robert Boyle, indicateurs colores (Londres, 1664) ;
 * Sorensen, echelle de pH (Copenhague, 1909).
 * Diluer un acide fort d'un facteur k divise la concentration en ions H+ par k,
 * donc augmente le pH de log10(k) (sans jamais depasser la neutralite).
 */
export function computeDilutedAcidPh(
  measurements: Record<string, number>,
): number | null {
  const { initialPh, dilutionFactor } = measurements;
  if (initialPh === undefined || !dilutionFactor) return null;
  if (initialPh < 0 || initialPh >= 7 || dilutionFactor < 1) return null;
  return Math.min(7, initialPh + Math.log10(dilutionFactor));
}
