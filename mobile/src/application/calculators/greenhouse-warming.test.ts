import { computeGreenhouseWarming } from './greenhouse-warming';

describe('computeGreenhouseWarming', () => {
  it('mesure l’ecart de temperature du a l’effet de serre', () => {
    expect(
      computeGreenhouseWarming({ co2JarTempC: 41.5, airJarTempC: 38 }),
    ).toBeCloseTo(3.5);
  });

  it('retourne null si une temperature est manquante', () => {
    expect(
      computeGreenhouseWarming({ co2JarTempC: 41.5 } as Record<string, number>),
    ).toBeNull();
  });
});
