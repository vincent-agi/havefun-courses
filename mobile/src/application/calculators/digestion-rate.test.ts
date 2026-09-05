import { computeDigestionRate } from './digestion-rate';

describe('computeDigestionRate', () => {
  it('calcule la fraction transformee par minute', () => {
    expect(
      computeDigestionRate({ transformedFraction: 0.9, durationMin: 15 }),
    ).toBeCloseTo(0.06);
  });

  it('vaut zero quand rien n’est transforme (sans salive)', () => {
    expect(
      computeDigestionRate({ transformedFraction: 0, durationMin: 15 }),
    ).toBe(0);
  });

  it('retourne null pour une fraction hors [0 ; 1] ou une duree nulle', () => {
    expect(
      computeDigestionRate({ transformedFraction: 1.4, durationMin: 15 }),
    ).toBeNull();
    expect(
      computeDigestionRate({ transformedFraction: 0.9, durationMin: 0 }),
    ).toBeNull();
  });
});
