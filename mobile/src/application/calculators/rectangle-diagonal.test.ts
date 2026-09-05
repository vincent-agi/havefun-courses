import { computeRectangleDiagonal } from './rectangle-diagonal';

describe('computeRectangleDiagonal', () => {
  it('calcule la diagonale attendue d’un rectangle 3 m x 4 m', () => {
    expect(computeRectangleDiagonal({ lengthM: 3, widthM: 4 })).toBe(5);
  });

  it('retourne null si une dimension est manquante', () => {
    expect(
      computeRectangleDiagonal({ lengthM: 3 } as Record<string, number>),
    ).toBeNull();
  });

  it('retourne null si une dimension est nulle ou negative', () => {
    expect(computeRectangleDiagonal({ lengthM: 3, widthM: 0 })).toBeNull();
  });
});
