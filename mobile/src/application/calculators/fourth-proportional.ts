export const FOURTH_PROPORTIONAL_FORMULA = 'fourth-proportional';

/**
 * Issue 1.3 — Fibonacci, Liber Abaci (Pise, 1202).
 * Regle de trois : de trois grandeurs proportionnelles connues (a, b, c),
 * on deduit la quatrieme telle que a/b = c/x, soit x = b * c / a.
 */
export function computeFourthProportional(
  measurements: Record<string, number>,
): number | null {
  const { referenceInput, referenceOutput, targetInput } = measurements;
  if (!referenceInput || !referenceOutput || !targetInput) return null;
  if (referenceInput <= 0) return null;
  return (referenceOutput * targetInput) / referenceInput;
}
