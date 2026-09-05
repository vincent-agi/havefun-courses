import { computeEuclideanRemainder } from './euclidean-division';

describe('computeEuclideanRemainder', () => {
  it('donne un reste nul pour un multiple exact (365 jours pleins)', () => {
    expect(
      computeEuclideanRemainder({ dividend: 365 * 86400, divisor: 86400 }),
    ).toBe(0);
  });

  it('isole la fraction de jour a rattraper (annee julienne de 365,25 j)', () => {
    // 31 557 600 s = 365,25 jours ; reste = 0,25 j = 21 600 s
    expect(
      computeEuclideanRemainder({ dividend: 31557600, divisor: 86400 }),
    ).toBe(21600);
    expect(
      computeEuclideanRemainder({ dividend: 1000000, divisor: 86400 }),
    ).toBe(49600);
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
