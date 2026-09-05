export const DISTILLATION_YIELD_FORMULA = 'distillation-yield';

/**
 * Issue 3.3 — Alambic : Marie la Juive (Alexandrie) ; Jabir ibn Hayyan, al-Razi.
 * Rendement d'une distillation = volume de distillat recueilli / volume
 * initial, exprime en pourcentage.
 */
export function computeDistillationYield(
  measurements: Record<string, number>,
): number | null {
  const { distillateVolumeMl, initialVolumeMl } = measurements;
  if (distillateVolumeMl === undefined || !initialVolumeMl) return null;
  if (distillateVolumeMl < 0 || initialVolumeMl <= 0) return null;
  if (distillateVolumeMl > initialVolumeMl) return null;
  return (distillateVolumeMl / initialVolumeMl) * 100;
}
