export const BURIAL_RATE_FORMULA = 'burial-rate';

/**
 * Issue 4.6 — Darwin, "worm stone" de Down House (1837-1881).
 * Les vers de terre remontent le sol : vitesse d'enfouissement d'une dalle
 * temoin = enfoncement mesure / duree, en mm par jour.
 */
export function computeBurialRate(
  measurements: Record<string, number>,
): number | null {
  const { sinkingMm, durationDays } = measurements;
  if (sinkingMm === undefined || !durationDays) return null;
  if (sinkingMm < 0 || durationDays <= 0) return null;
  return sinkingMm / durationDays;
}
