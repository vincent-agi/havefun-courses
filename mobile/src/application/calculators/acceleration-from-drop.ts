export const ACCELERATION_FROM_DROP_FORMULA = 'acceleration-from-drop';

/**
 * Issue 2.2 — Galilee, plan incline (Padoue, debut XVIIe s.).
 * Mouvement uniformement accelere sans vitesse initiale : d = 1/2 a t^2,
 * donc a = 2 d / t^2. La distance croit comme le carre du temps.
 */
export function computeAccelerationFromDrop(
  measurements: Record<string, number>,
): number | null {
  const { distanceM, timeS } = measurements;
  if (!distanceM || !timeS || distanceM <= 0 || timeS <= 0) return null;
  return (2 * distanceM) / (timeS * timeS);
}
