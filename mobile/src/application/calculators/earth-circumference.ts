export const EARTH_CIRCUMFERENCE_FORMULA = 'earth-circumference';

/**
 * Issue 1.9 — Eratosthene, Syene / Alexandrie (v. 240 av. J.-C.).
 * L'angle d'ombre entre deux villes sur un meme meridien est la fraction
 * de tour qui separe leurs verticales : circonference = distance * 360 / angle.
 */
export function computeEarthCircumference(
  measurements: Record<string, number>,
): number | null {
  const { shadowAngleDeg, distanceKm } = measurements;
  if (!shadowAngleDeg || !distanceKm) return null;
  if (shadowAngleDeg <= 0 || shadowAngleDeg >= 360 || distanceKm <= 0) {
    return null;
  }
  return (distanceKm * 360) / shadowAngleDeg;
}
