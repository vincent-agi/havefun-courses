export const DENSITY_FORMULA = 'density';

/**
 * Issue 2.4 — Archimede et la couronne d'Hieron II (Syracuse).
 * Masse volumique = masse / volume deplace. Comparee a l'eau (1 g/cm3),
 * elle dit si le corps flotte (< 1) ou coule (> 1).
 */
export function computeDensity(
  measurements: Record<string, number>,
): number | null {
  const { massG, displacedVolumeCm3 } = measurements;
  if (!massG || !displacedVolumeCm3 || massG <= 0 || displacedVolumeCm3 <= 0) {
    return null;
  }
  return massG / displacedVolumeCm3;
}
