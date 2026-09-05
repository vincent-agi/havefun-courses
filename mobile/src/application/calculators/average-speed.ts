export const AVERAGE_SPEED_FORMULA = 'average-speed';

/**
 * Issue 1.16 — Nicole Oresme, configuration des qualites (Paris, XIVe s.).
 * Vitesse moyenne d'un mouvement = distance parcourue / duree.
 */
export function computeAverageSpeed(
  measurements: Record<string, number>,
): number | null {
  const { distanceM, timeS } = measurements;
  if (distanceM === undefined || !timeS || timeS <= 0 || distanceM < 0) {
    return null;
  }
  return distanceM / timeS;
}
