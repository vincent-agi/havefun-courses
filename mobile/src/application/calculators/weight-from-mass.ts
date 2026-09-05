export const WEIGHT_FROM_MASS_FORMULA = 'weight-from-mass';

/**
 * Issue 2.3 — Newton, Principia (1687) ; verger de Woolsthorpe.
 * La masse (kg) est propre a la matiere ; le poids (N) depend de l'astre :
 * P = m * g, avec g l'intensite de la pesanteur du lieu.
 */
export function computeWeightFromMass(
  measurements: Record<string, number>,
): number | null {
  const { massKg, gravityNPerKg } = measurements;
  if (!massKg || !gravityNPerKg || massKg <= 0 || gravityNPerKg <= 0) {
    return null;
  }
  return massKg * gravityNPerKg;
}
