export const FRUIT_SET_RATE_FORMULA = 'fruit-set-rate';

/**
 * Issue 4.21 — Camerarius, De sexu plantarum (Tubingen, 1694).
 * Taux de nouaison = nombre de fleurs ayant donne un fruit / nombre de fleurs
 * suivies. Il s'effondre pour les fleurs isolees de tout pollen.
 */
export function computeFruitSetRate(
  measurements: Record<string, number>,
): number | null {
  const { fruitCount, flowerCount } = measurements;
  if (fruitCount === undefined || !flowerCount) return null;
  if (
    fruitCount < 0 ||
    flowerCount <= 0 ||
    fruitCount > flowerCount ||
    !Number.isInteger(fruitCount) ||
    !Number.isInteger(flowerCount)
  ) {
    return null;
  }
  return fruitCount / flowerCount;
}
