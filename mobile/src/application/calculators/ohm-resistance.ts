export const OHM_RESISTANCE_FORMULA = 'ohm-resistance';

/**
 * Issue 2.11 — Georg Ohm, Die galvanische Kette (Cologne, 1827).
 * Dipole ohmique : U proportionnelle a I ; le coefficient est la resistance
 * R = U / I (en ohms).
 */
export function computeOhmResistance(
  measurements: Record<string, number>,
): number | null {
  const { voltageV, currentA } = measurements;
  if (voltageV === undefined || !currentA || currentA <= 0 || voltageV < 0) {
    return null;
  }
  return voltageV / currentA;
}
