import { computeOxygenFraction } from './oxygen-fraction';

describe('computeOxygenFraction', () => {
  it('retrouve ~1/5 du volume d’air', () => {
    expect(
      computeOxygenFraction({ waterRiseMl: 42, initialAirMl: 200 }),
    ).toBeCloseTo(0.21);
  });

  it('retourne null si la montee depasse le volume d’air', () => {
    expect(
      computeOxygenFraction({ waterRiseMl: 250, initialAirMl: 200 }),
    ).toBeNull();
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeOxygenFraction({ waterRiseMl: 42 } as Record<string, number>),
    ).toBeNull();
  });
});
