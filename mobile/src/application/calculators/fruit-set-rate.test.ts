import { computeFruitSetRate } from './fruit-set-rate';

describe('computeFruitSetRate', () => {
  it('calcule le taux de nouaison', () => {
    expect(computeFruitSetRate({ fruitCount: 7, flowerCount: 10 })).toBe(0.7);
  });

  it('vaut zero pour des fleurs isolees de tout pollen', () => {
    expect(computeFruitSetRate({ fruitCount: 0, flowerCount: 10 })).toBe(0);
  });

  it('retourne null si les fruits depassent les fleurs suivies', () => {
    expect(computeFruitSetRate({ fruitCount: 12, flowerCount: 10 })).toBeNull();
  });

  it('retourne null pour une valeur non entiere ou manquante', () => {
    expect(
      computeFruitSetRate({ fruitCount: 7 } as Record<string, number>),
    ).toBeNull();
  });
});
