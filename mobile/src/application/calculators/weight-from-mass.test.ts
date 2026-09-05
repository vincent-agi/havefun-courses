import { computeWeightFromMass } from './weight-from-mass';

describe('computeWeightFromMass', () => {
  it('calcule le poids sur Terre (g = 9,8 N/kg)', () => {
    expect(computeWeightFromMass({ massKg: 2, gravityNPerKg: 9.8 })).toBeCloseTo(
      19.6,
    );
  });

  it('meme masse, poids ~6 fois plus faible sur la Lune', () => {
    expect(computeWeightFromMass({ massKg: 2, gravityNPerKg: 1.6 })).toBeCloseTo(
      3.2,
    );
  });

  it('retourne null si une valeur est manquante ou nulle', () => {
    expect(computeWeightFromMass({ massKg: 2 } as Record<string, number>)).toBeNull();
    expect(computeWeightFromMass({ massKg: 0, gravityNPerKg: 9.8 })).toBeNull();
  });
});
