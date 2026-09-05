export const MASS_BALANCE_FORMULA = 'mass-balance';

/**
 * Issue 3.6 — Lavoisier, calcination de l'etain en vase clos (Paris, v. 1774).
 * En systeme ferme, la masse ne change pas : l'ecart (produits - reactifs)
 * doit etre proche de zero, quelles que soient les transformations internes.
 */
export function computeMassBalance(
  measurements: Record<string, number>,
): number | null {
  const { reactantsMassG, productsMassG } = measurements;
  if (reactantsMassG === undefined || productsMassG === undefined) return null;
  if (reactantsMassG < 0 || productsMassG < 0) return null;
  return productsMassG - reactantsMassG;
}
