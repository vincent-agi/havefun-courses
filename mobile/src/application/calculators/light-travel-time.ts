export const LIGHT_TRAVEL_TIME_FORMULA = 'light-travel-time';

/**
 * Issue 2.14 — Romer, Observatoire de Paris (1676) ; Fizeau (1849).
 * La lumiere a une vitesse finie : duree de trajet = distance / vitesse.
 */
export function computeLightTravelTime(
  measurements: Record<string, number>,
): number | null {
  const { distanceM, speedMs } = measurements;
  if (!distanceM || !speedMs || distanceM <= 0 || speedMs <= 0) return null;
  return distanceM / speedMs;
}
