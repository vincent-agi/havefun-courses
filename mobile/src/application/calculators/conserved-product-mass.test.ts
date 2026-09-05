import { computeConservedProductMass } from './conserved-product-mass';

describe('computeConservedProductMass', () => {
  it('la masse des produits egale la somme des reactifs', () => {
    expect(
      computeConservedProductMass({
        reactant1MassG: 16,
        reactant2MassG: 64,
      }),
    ).toBe(80);
  });

  it('retourne null si une masse de reactif est manquante', () => {
    expect(
      computeConservedProductMass({ reactant1MassG: 16 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
