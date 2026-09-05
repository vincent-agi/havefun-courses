export const OXYGEN_FRACTION_FORMULA = 'oxygen-fraction';

/**
 * Issue 3.7 — Priestley (1774) ; Lavoisier, experience des 12 jours.
 * Quand une combustion ou une oxydation consomme le dioxygene d'un volume
 * d'air clos, l'eau monte : fraction de dioxygene = montee d'eau / volume
 * d'air initial (~0,21).
 */
export function computeOxygenFraction(
  measurements: Record<string, number>,
): number | null {
  const { waterRiseMl, initialAirMl } = measurements;
  if (waterRiseMl === undefined || !initialAirMl) return null;
  if (waterRiseMl < 0 || initialAirMl <= 0 || waterRiseMl > initialAirMl) {
    return null;
  }
  return waterRiseMl / initialAirMl;
}
