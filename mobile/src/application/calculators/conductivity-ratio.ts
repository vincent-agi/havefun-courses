export const CONDUCTIVITY_RATIO_FORMULA = 'conductivity-ratio';

/**
 * Issue 3.14 — Faraday (Londres, 1834) ; Arrhenius (Uppsala, 1884).
 * Plus une solution contient d'ions, mieux elle conduit : le rapport
 * intensite(solution) / intensite(eau de reference) mesure cet apport.
 */
export function computeConductivityRatio(
  measurements: Record<string, number>,
): number | null {
  const { solutionCurrentMa, referenceCurrentMa } = measurements;
  if (solutionCurrentMa === undefined || !referenceCurrentMa) return null;
  if (solutionCurrentMa < 0 || referenceCurrentMa <= 0) return null;
  return solutionCurrentMa / referenceCurrentMa;
}
