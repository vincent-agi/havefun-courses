export const ILLUMINATED_FRACTION_FORMULA = 'illuminated-fraction';

/**
 * Issue 2.8 — Aristarque de Samos ; eclipse de -585 (Herodote).
 * Phases : la fraction eclairee de la Lune vue de la Terre depend de l'angle
 * de phase : f = (1 + cos(angle)) / 2 (0 = nouvelle Lune, 180 = pleine Lune).
 */
export function computeIlluminatedFraction(
  measurements: Record<string, number>,
): number | null {
  const { phaseAngleDeg } = measurements;
  if (
    phaseAngleDeg === undefined ||
    !Number.isFinite(phaseAngleDeg) ||
    phaseAngleDeg < 0 ||
    phaseAngleDeg > 360
  ) {
    return null;
  }
  return (1 + Math.cos((phaseAngleDeg * Math.PI) / 180)) / 2;
}
