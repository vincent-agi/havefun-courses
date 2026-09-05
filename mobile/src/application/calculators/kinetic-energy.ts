export const KINETIC_ENERGY_FORMULA = 'kinetic-energy';

/**
 * Issue 2.16 — Emilie du Chatelet, Institutions de physique (Cirey, 1740).
 * L'energie de mouvement croit comme le carre de la vitesse :
 * Ec = 1/2 * m * v^2 (en joules).
 */
export function computeKineticEnergy(
  measurements: Record<string, number>,
): number | null {
  const { massKg, speedMs } = measurements;
  if (!massKg || speedMs === undefined) return null;
  if (massKg <= 0 || speedMs < 0 || !Number.isFinite(speedMs)) return null;
  return 0.5 * massKg * speedMs * speedMs;
}
