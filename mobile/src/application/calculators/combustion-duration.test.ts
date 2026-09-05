import { computeCombustionDuration } from './combustion-duration';

describe('computeCombustionDuration', () => {
  it('predit la duree proportionnellement au volume d’air', () => {
    // 250 mL -> 12 s ; 1000 mL -> 48 s
    expect(
      computeCombustionDuration({
        referenceVolumeMl: 250,
        referenceTimeS: 12,
        targetVolumeMl: 1000,
      }),
    ).toBeCloseTo(48);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeCombustionDuration({
        referenceVolumeMl: 250,
        referenceTimeS: 12,
      } as Record<string, number>),
    ).toBeNull();
  });
});
