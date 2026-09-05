import { computePileVoltage } from './pile-voltage';

describe('computePileVoltage', () => {
  it('additionne la tension de chaque element empile', () => {
    expect(
      computePileVoltage({ cellCount: 6, voltagePerCellV: 0.76 }),
    ).toBeCloseTo(4.56);
  });

  it('retourne null pour un nombre d’elements non entier ou nul', () => {
    expect(
      computePileVoltage({ cellCount: 0, voltagePerCellV: 0.76 }),
    ).toBeNull();
    expect(
      computePileVoltage({ cellCount: 2.5, voltagePerCellV: 0.76 }),
    ).toBeNull();
  });

  it('retourne null si une valeur est manquante', () => {
    expect(
      computePileVoltage({ cellCount: 6 } as Record<string, number>),
    ).toBeNull();
  });
});
