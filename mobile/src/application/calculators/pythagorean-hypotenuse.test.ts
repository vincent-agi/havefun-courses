import { computePythagoreanHypotenuse } from './pythagorean-hypotenuse';

describe('computePythagoreanHypotenuse', () => {
  it('retrouve le triplet 3-4-5', () => {
    expect(computePythagoreanHypotenuse({ legAM: 3, legBM: 4 })).toBe(5);
  });

  it('calcule une hypotenuse irrationnelle', () => {
    expect(computePythagoreanHypotenuse({ legAM: 1, legBM: 1 })).toBeCloseTo(
      Math.SQRT2,
    );
  });

  it('retourne null si un cote est manquant ou nul', () => {
    expect(computePythagoreanHypotenuse({ legAM: 3 } as Record<
      string,
      number
    >)).toBeNull();
    expect(computePythagoreanHypotenuse({ legAM: 3, legBM: 0 })).toBeNull();
  });
});
