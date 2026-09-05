export const CARDIAC_OUTPUT_FORMULA = 'cardiac-output';

/**
 * Issue 4.15 — William Harvey, De Motu Cordis (Londres, 1628).
 * Argument quantitatif : debit cardiaque = volume chasse par battement *
 * frequence cardiaque. En une heure, il depasse la masse du corps : le sang
 * circule en boucle.
 */
export function computeCardiacOutput(
  measurements: Record<string, number>,
): number | null {
  const { strokeVolumeMl, heartRateBpm } = measurements;
  if (!strokeVolumeMl || !heartRateBpm) return null;
  if (strokeVolumeMl <= 0 || heartRateBpm <= 0) return null;
  return strokeVolumeMl * heartRateBpm;
}
