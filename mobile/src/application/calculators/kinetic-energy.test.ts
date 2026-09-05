import { computeKineticEnergy } from './kinetic-energy';

describe('computeKineticEnergy', () => {
  it('calcule 1/2 m v^2', () => {
    expect(computeKineticEnergy({ massKg: 2, speedMs: 3 })).toBe(9);
  });

  it('quadruple quand la vitesse double', () => {
    const v = computeKineticEnergy({ massKg: 2, speedMs: 3 }) as number;
    const v2 = computeKineticEnergy({ massKg: 2, speedMs: 6 }) as number;
    expect(v2 / v).toBeCloseTo(4);
  });

  it('retourne null si la masse est nulle ou manquante', () => {
    expect(computeKineticEnergy({ speedMs: 3 } as Record<string, number>)).toBeNull();
    expect(computeKineticEnergy({ massKg: 0, speedMs: 3 })).toBeNull();
  });
});
