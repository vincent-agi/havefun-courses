import { computeLightTravelTime } from './light-travel-time';

describe('computeLightTravelTime', () => {
  it('la lumiere du Soleil met ~500 s a nous atteindre', () => {
    expect(
      computeLightTravelTime({ distanceM: 1.5e11, speedMs: 3e8 }),
    ).toBeCloseTo(500);
  });

  it('retourne null si une valeur est nulle ou manquante', () => {
    expect(
      computeLightTravelTime({ distanceM: 1.5e11 } as Record<string, number>),
    ).toBeNull();
    expect(computeLightTravelTime({ distanceM: 1.5e11, speedMs: 0 })).toBeNull();
  });
});
