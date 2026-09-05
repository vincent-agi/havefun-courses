import { computePlateDisplacement } from './plate-displacement';

describe('computePlateDisplacement', () => {
  it('cumule le deplacement d’une plaque sur la duree', () => {
    // 2,5 cm/an sur 1 000 000 d'annees -> 2 500 000 cm (25 km)
    expect(
      computePlateDisplacement({ rateCmPerYear: 2.5, years: 1_000_000 }),
    ).toBe(2_500_000);
  });

  it('retourne null si une valeur est negative ou manquante', () => {
    expect(
      computePlateDisplacement({ rateCmPerYear: 2.5 } as Record<string, number>),
    ).toBeNull();
  });
});
