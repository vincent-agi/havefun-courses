import { computeOxidationMassGain } from './oxidation-mass-gain';

describe('computeOxidationMassGain', () => {
  it('la laine de fer brulee gagne de la masse', () => {
    expect(
      computeOxidationMassGain({ initialMassG: 3, finalMassG: 4.1 }),
    ).toBeCloseTo(1.1);
  });

  it('retourne null si la masse initiale est manquante', () => {
    expect(
      computeOxidationMassGain({ finalMassG: 4.1 } as Record<string, number>),
    ).toBeNull();
  });
});
