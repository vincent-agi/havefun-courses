import { computeInfiltrationRate } from './infiltration-rate';

describe('computeInfiltrationRate', () => {
  it('calcule la vitesse d’infiltration en mL/s', () => {
    expect(
      computeInfiltrationRate({
        waterVolumeMl: 500,
        infiltrationTimeS: 40,
      }),
    ).toBeCloseTo(12.5);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeInfiltrationRate({ waterVolumeMl: 500 } as Record<string, number>),
    ).toBeNull();
  });
});
