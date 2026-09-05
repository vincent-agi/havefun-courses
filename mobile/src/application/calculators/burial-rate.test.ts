import { computeBurialRate } from './burial-rate';

describe('computeBurialRate', () => {
  it('calcule l’enfoncement par jour', () => {
    expect(computeBurialRate({ sinkingMm: 6, durationDays: 60 })).toBeCloseTo(
      0.1,
    );
  });

  it('retourne null si la duree est nulle ou manquante', () => {
    expect(computeBurialRate({ sinkingMm: 6, durationDays: 0 })).toBeNull();
    expect(
      computeBurialRate({ sinkingMm: 6 } as Record<string, number>),
    ).toBeNull();
  });
});
