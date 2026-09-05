import { computeAverageSpeed } from './average-speed';

describe('computeAverageSpeed', () => {
  it('calcule distance / duree', () => {
    expect(computeAverageSpeed({ distanceM: 50, timeS: 40 })).toBe(1.25);
  });

  it('retourne null si la duree est nulle', () => {
    expect(computeAverageSpeed({ distanceM: 50, timeS: 0 })).toBeNull();
  });

  it('retourne null si la distance est manquante', () => {
    expect(
      computeAverageSpeed({ timeS: 40 } as Record<string, number>),
    ).toBeNull();
  });
});
