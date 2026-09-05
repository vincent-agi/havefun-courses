import { computeSquareDiagonal } from './square-diagonal';

describe('computeSquareDiagonal', () => {
  it('renvoie racine(2) pour un carre de cote 1 m', () => {
    expect(computeSquareDiagonal({ sideM: 1 })).toBeCloseTo(1.41421356);
  });

  it('est proportionnelle au cote', () => {
    expect(computeSquareDiagonal({ sideM: 2 })).toBeCloseTo(2 * Math.SQRT2);
  });

  it('retourne null si le cote est manquant ou nul', () => {
    expect(computeSquareDiagonal({} as Record<string, number>)).toBeNull();
    expect(computeSquareDiagonal({ sideM: 0 })).toBeNull();
  });
});
