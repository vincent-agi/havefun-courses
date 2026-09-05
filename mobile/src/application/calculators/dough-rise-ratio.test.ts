import { computeDoughRiseRatio } from './dough-rise-ratio';

describe('computeDoughRiseRatio', () => {
  it('mesure le coefficient de levee', () => {
    expect(
      computeDoughRiseRatio({ finalHeightMm: 45, initialHeightMm: 20 }),
    ).toBeCloseTo(2.25);
  });

  it('vaut 1 pour une pate sans levure (pas de levee)', () => {
    expect(
      computeDoughRiseRatio({ finalHeightMm: 20, initialHeightMm: 20 }),
    ).toBe(1);
  });

  it('retourne null si une hauteur est manquante', () => {
    expect(
      computeDoughRiseRatio({ finalHeightMm: 45 } as Record<string, number>),
    ).toBeNull();
  });
});
