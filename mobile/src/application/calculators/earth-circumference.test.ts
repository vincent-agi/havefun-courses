import { computeEarthCircumference } from './earth-circumference';

describe('computeEarthCircumference', () => {
  it('reconstitue la mesure d’Eratosthene (7,2 deg sur ~800 km)', () => {
    const result = computeEarthCircumference({
      shadowAngleDeg: 7.2,
      distanceKm: 800,
    });
    expect(result).toBeCloseTo(40000, 0);
  });

  it('retourne null si l’angle est hors plage', () => {
    expect(
      computeEarthCircumference({ shadowAngleDeg: 0, distanceKm: 800 }),
    ).toBeNull();
    expect(
      computeEarthCircumference({ shadowAngleDeg: 400, distanceKm: 800 }),
    ).toBeNull();
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeEarthCircumference({ distanceKm: 800 } as Record<string, number>),
    ).toBeNull();
  });
});
