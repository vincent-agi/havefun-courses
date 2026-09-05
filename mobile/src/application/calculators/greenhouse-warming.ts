export const GREENHOUSE_WARMING_FORMULA = 'greenhouse-warming';

/**
 * Issue 4.16 — Fourier (1824) ; Tyndall (1859) ; Arrhenius (1896) ; Keeling (1958).
 * Deux bocaux au soleil : celui enrichi en dioxyde de carbone monte plus haut
 * en temperature. Ecart = temperature du bocal CO2 - temperature du bocal air.
 */
export function computeGreenhouseWarming(
  measurements: Record<string, number>,
): number | null {
  const { co2JarTempC, airJarTempC } = measurements;
  if (
    co2JarTempC === undefined ||
    airJarTempC === undefined ||
    !Number.isFinite(co2JarTempC) ||
    !Number.isFinite(airJarTempC)
  ) {
    return null;
  }
  return co2JarTempC - airJarTempC;
}
