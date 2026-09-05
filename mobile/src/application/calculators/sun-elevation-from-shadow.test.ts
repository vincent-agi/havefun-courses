import { computeSunElevationFromShadow } from './sun-elevation-from-shadow';

describe('computeSunElevationFromShadow', () => {
  it('ombre egale a la hauteur -> Soleil a 45 deg', () => {
    expect(
      computeSunElevationFromShadow({ gnomonHeightM: 1, shadowLengthM: 1 }),
    ).toBeCloseTo(45);
  });

  it('ombre plus longue -> Soleil plus bas', () => {
    const low = computeSunElevationFromShadow({
      gnomonHeightM: 1,
      shadowLengthM: 3,
    });
    expect(low).not.toBeNull();
    expect(low as number).toBeLessThan(45);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeSunElevationFromShadow({ gnomonHeightM: 1 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
