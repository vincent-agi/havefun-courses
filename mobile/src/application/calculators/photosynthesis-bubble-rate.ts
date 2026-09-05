export const PHOTOSYNTHESIS_BUBBLE_RATE_FORMULA = 'photosynthesis-bubble-rate';

/**
 * Issue 4.13 — Ingenhousz (1779) ; de Saussure (1804) ; Sachs (1862).
 * A la lumiere, l'elodee degage du dioxygene : le debit de bulles
 * (bulles / minute) mesure l'intensite de la photosynthese.
 */
export function computePhotosynthesisBubbleRate(
  measurements: Record<string, number>,
): number | null {
  const { bubbleCount, durationMinutes } = measurements;
  if (bubbleCount === undefined || !durationMinutes) return null;
  if (bubbleCount < 0 || durationMinutes <= 0) return null;
  return bubbleCount / durationMinutes;
}
