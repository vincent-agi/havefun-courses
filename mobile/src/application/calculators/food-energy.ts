export const FOOD_ENERGY_FORMULA = 'food-energy';

const WATER_SPECIFIC_HEAT_J_PER_G_PER_C = 4.2;

/**
 * Issue 4.19 — Lavoisier & Laplace, calorimetre a glace (1782-1783) ; Atwater.
 * Calorimetrie de terrain : l'energie liberee par un aliment qui brule sous un
 * recipient d'eau = masse d'eau * 4,2 * elevation de temperature (en joules).
 */
export function computeFoodEnergy(
  measurements: Record<string, number>,
): number | null {
  const { waterMassG, temperatureRiseC } = measurements;
  if (!waterMassG || temperatureRiseC === undefined) return null;
  if (waterMassG <= 0 || temperatureRiseC <= 0) return null;
  return waterMassG * WATER_SPECIFIC_HEAT_J_PER_G_PER_C * temperatureRiseC;
}
