export const DISK_AREA_FORMULA = 'disk-area';

/**
 * Issue 1.6 — Archimede, methode d'exhaustion (et Liu Hui, Chine, 263).
 * Aire du disque encadree par des polygones : A = pi * R^2.
 */
export function computeDiskArea(
  measurements: Record<string, number>,
): number | null {
  const { radiusM } = measurements;
  if (!radiusM || radiusM <= 0) return null;
  return Math.PI * radiusM * radiusM;
}
