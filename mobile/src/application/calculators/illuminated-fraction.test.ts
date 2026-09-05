import { computeIlluminatedFraction } from './illuminated-fraction';

describe('computeIlluminatedFraction', () => {
  it('nouvelle Lune (0 deg) -> 0, pleine Lune (180 deg) -> 1', () => {
    expect(computeIlluminatedFraction({ phaseAngleDeg: 0 })).toBeCloseTo(1);
    expect(computeIlluminatedFraction({ phaseAngleDeg: 180 })).toBeCloseTo(0);
  });

  it('premier quartier (90 deg) -> moitie eclairee', () => {
    expect(computeIlluminatedFraction({ phaseAngleDeg: 90 })).toBeCloseTo(0.5);
  });

  it('retourne null hors de [0 ; 360] ou sans mesure', () => {
    expect(computeIlluminatedFraction({ phaseAngleDeg: -10 })).toBeNull();
    expect(
      computeIlluminatedFraction({} as Record<string, number>),
    ).toBeNull();
  });
});
