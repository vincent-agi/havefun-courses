export const VENTILATION_RATE_FORMULA = 'ventilation-rate';

/**
 * Issue 4.10 — Lavoisier et Seguin, mesures sur l'homme (Paris, 1790).
 * Debit ventilatoire = volume d'un souffle * nombre de respirations par minute
 * (il augmente nettement a l'effort).
 */
export function computeVentilationRate(
  measurements: Record<string, number>,
): number | null {
  const { breathVolumeMl, breathsPerMinute } = measurements;
  if (!breathVolumeMl || !breathsPerMinute) return null;
  if (breathVolumeMl <= 0 || breathsPerMinute <= 0) return null;
  return breathVolumeMl * breathsPerMinute;
}
