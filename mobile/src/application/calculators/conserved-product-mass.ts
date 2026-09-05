export const CONSERVED_PRODUCT_MASS_FORMULA = 'conserved-product-mass';

/**
 * Issue 3.10 — Lavoisier (1789) + Dalton (1808) ; Berzelius (1813).
 * Les atomes se rearrangent sans disparaitre : la masse totale des produits
 * est egale a la somme des masses des reactifs.
 */
export function computeConservedProductMass(
  measurements: Record<string, number>,
): number | null {
  const { reactant1MassG, reactant2MassG } = measurements;
  if (reactant1MassG === undefined || reactant2MassG === undefined) return null;
  if (reactant1MassG < 0 || reactant2MassG < 0) return null;
  return reactant1MassG + reactant2MassG;
}
