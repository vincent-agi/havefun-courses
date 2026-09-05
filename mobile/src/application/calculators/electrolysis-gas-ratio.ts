export const ELECTROLYSIS_GAS_RATIO_FORMULA = 'electrolysis-gas-ratio';

/**
 * Issue 3.11 — Nicholson et Carlisle (Londres, 1800) ; Lavoisier & Laplace (1783).
 * L'electrolyse de l'eau produit du dihydrogene et du dioxygene dans un
 * rapport de volumes proche de 2 : V(H2) / V(O2).
 */
export function computeElectrolysisGasRatio(
  measurements: Record<string, number>,
): number | null {
  const { hydrogenVolumeMl, oxygenVolumeMl } = measurements;
  if (!hydrogenVolumeMl || !oxygenVolumeMl) return null;
  if (hydrogenVolumeMl <= 0 || oxygenVolumeMl <= 0) return null;
  return hydrogenVolumeMl / oxygenVolumeMl;
}
