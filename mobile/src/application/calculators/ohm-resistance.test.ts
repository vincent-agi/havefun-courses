import { computeOhmResistance } from './ohm-resistance';

describe('computeOhmResistance', () => {
  it('calcule R = U / I', () => {
    expect(computeOhmResistance({ voltageV: 4.5, currentA: 0.09 })).toBeCloseTo(
      50,
    );
  });

  it('retourne null si le courant est nul', () => {
    expect(computeOhmResistance({ voltageV: 4.5, currentA: 0 })).toBeNull();
  });

  it('retourne null si la tension est manquante', () => {
    expect(
      computeOhmResistance({ currentA: 0.09 } as Record<string, number>),
    ).toBeNull();
  });
});
