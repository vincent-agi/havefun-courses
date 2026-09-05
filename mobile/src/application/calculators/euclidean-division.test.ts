import { computeEuclideanRemainder } from './euclidean-division';

describe('computeEuclideanRemainder', () => {
  it('donne le reste de la division euclidienne', () => {
    expect(
      computeEuclideanRemainder({ dividend: 31557600, divisor: 86400 }),
    ).toBe(0);
    expect(computeEuclideanRemainder({ dividend: 1000000, divisor: 86400 })).toBe(
      49600,
    );
  });

  it('accepte un dividende nul', () => {
    expect(computeEuclideanRemainder({ dividend: 0, divisor: 7 })).toBe(0);
  });

  it('retourne null si le diviseur est nul ou manquant', () => {
    expect(computeEuclideanRemainder({ dividend: 10, divisor: 0 })).toBeNull();
    expect(
      computeEuclideanRemainder({ dividend: 10 } as Record<string, number>),
    ).toBeNull();
  });
});
