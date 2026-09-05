export const MIXTURE_TEMPERATURE_FORMULA = 'mixture-temperature';

/**
 * Issue 3.1 — Joseph Black, chaleur latente (Glasgow, 1761).
 * En melangeant deux masses d'eau, la temperature d'equilibre est la moyenne
 * ponderee par les masses : (m1 T1 + m2 T2) / (m1 + m2).
 */
export function computeMixtureTemperature(
  measurements: Record<string, number>,
): number | null {
  const { mass1G, temp1C, mass2G, temp2C } = measurements;
  if (
    !mass1G ||
    !mass2G ||
    temp1C === undefined ||
    temp2C === undefined ||
    mass1G <= 0 ||
    mass2G <= 0
  ) {
    return null;
  }
  return (mass1G * temp1C + mass2G * temp2C) / (mass1G + mass2G);
}
