export const OXIDATION_MASS_GAIN_FORMULA = 'oxidation-mass-gain';

/**
 * Issue 3.12 — Lavoisier ; Goldschmidt (aluminothermie, 1893) ; Sorel (1837).
 * En s'oxydant (rouille lente ou combustion vive), un metal fixe le dioxygene
 * de l'air : gain de masse = masse finale - masse initiale (> 0).
 */
export function computeOxidationMassGain(
  measurements: Record<string, number>,
): number | null {
  const { initialMassG, finalMassG } = measurements;
  if (!initialMassG || finalMassG === undefined) return null;
  if (initialMassG <= 0 || finalMassG < 0) return null;
  return finalMassG - initialMassG;
}
