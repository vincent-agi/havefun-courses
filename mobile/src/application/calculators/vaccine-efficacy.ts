export const VACCINE_EFFICACY_FORMULA = 'vaccine-efficacy';

/**
 * Issue 4.18 — Jenner (Berkeley, 1796) ; Pasteur, Pouilly-le-Fort (1881).
 * Essai controle a deux lots : efficacite (%) = (1 - taux d'attaque du lot
 * vaccine / taux d'attaque du lot temoin) * 100.
 */
export function computeVaccineEfficacy(
  measurements: Record<string, number>,
): number | null {
  const { controlAttackRate, vaccinatedAttackRate } = measurements;
  if (!controlAttackRate || vaccinatedAttackRate === undefined) return null;
  if (
    controlAttackRate <= 0 ||
    controlAttackRate > 1 ||
    vaccinatedAttackRate < 0 ||
    vaccinatedAttackRate > 1
  ) {
    return null;
  }
  return (1 - vaccinatedAttackRate / controlAttackRate) * 100;
}
