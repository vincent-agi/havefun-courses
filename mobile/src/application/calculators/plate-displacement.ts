export const PLATE_DISPLACEMENT_FORMULA = 'plate-displacement';

/**
 * Issue 4.17 — Wegener, derive des continents (1912) ; oceanographie des annees 1960.
 * Les plaques bougent de quelques cm par an : deplacement = vitesse * duree.
 */
export function computePlateDisplacement(
  measurements: Record<string, number>,
): number | null {
  const { rateCmPerYear, years } = measurements;
  if (rateCmPerYear === undefined || years === undefined) return null;
  if (rateCmPerYear < 0 || years < 0) return null;
  if (!Number.isFinite(rateCmPerYear) || !Number.isFinite(years)) return null;
  return rateCmPerYear * years;
}
