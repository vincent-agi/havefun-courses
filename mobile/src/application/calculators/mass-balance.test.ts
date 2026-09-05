import { computeMassBalance } from './mass-balance';

describe('computeMassBalance', () => {
  it('vaut zero quand la masse est conservee (systeme ferme)', () => {
    expect(
      computeMassBalance({ reactantsMassG: 152.4, productsMassG: 152.4 }),
    ).toBe(0);
  });

  it('mesure l’ecart de pesee (pertes ou gains apparents)', () => {
    expect(
      computeMassBalance({ reactantsMassG: 152.4, productsMassG: 151.9 }),
    ).toBeCloseTo(-0.5);
  });

  it('retourne null si une pesee est manquante', () => {
    expect(
      computeMassBalance({ reactantsMassG: 152.4 } as Record<string, number>),
    ).toBeNull();
  });
});
