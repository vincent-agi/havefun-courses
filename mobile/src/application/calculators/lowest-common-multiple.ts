export const LOWEST_COMMON_MULTIPLE_FORMULA = 'lowest-common-multiple';

function greatestCommonDivisor(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

/**
 * Issue 1.8 — Crible d'Eratosthene (Alexandrie, v. 240 av. J.-C.).
 * Deux engrenages de a et b dents reviennent en phase apres PPCM(a, b) dents.
 */
export function computeLowestCommonMultiple(
  measurements: Record<string, number>,
): number | null {
  const { a, b } = measurements;
  if (!a || !b || a <= 0 || b <= 0) return null;
  if (!Number.isInteger(a) || !Number.isInteger(b)) return null;
  return (a / greatestCommonDivisor(a, b)) * b;
}
