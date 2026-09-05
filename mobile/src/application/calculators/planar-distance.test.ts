import { computePlanarDistance } from './planar-distance';

describe('computePlanarDistance', () => {
  it('applique la distance euclidienne (triangle 3-4-5)', () => {
    expect(
      computePlanarDistance({ x1: 0, y1: 0, x2: 3, y2: 4 }),
    ).toBe(5);
  });

  it('gere des coordonnees relatives negatives', () => {
    expect(
      computePlanarDistance({ x1: -3, y1: -2, x2: 0, y2: 2 }),
    ).toBe(5);
  });

  it('retourne null si une coordonnee est manquante', () => {
    expect(
      computePlanarDistance({ x1: 0, y1: 0, x2: 3 } as Record<string, number>),
    ).toBeNull();
  });
});
