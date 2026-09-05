export const ATTACK_RATE_FORMULA = 'attack-rate';

/**
 * Issue 4.12 — Semmelweis (Vienne, 1847) ; John Snow (Londres, 1854).
 * Enquete de terrain : taux d'attaque d'une source suspecte = nombre de
 * malades exposes / nombre total d'exposes a cette source.
 */
export function computeAttackRate(
  measurements: Record<string, number>,
): number | null {
  const { cases, exposed } = measurements;
  if (cases === undefined || !exposed) return null;
  if (
    cases < 0 ||
    exposed <= 0 ||
    cases > exposed ||
    !Number.isInteger(cases) ||
    !Number.isInteger(exposed)
  ) {
    return null;
  }
  return cases / exposed;
}
