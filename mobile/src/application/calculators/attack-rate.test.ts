import { computeAttackRate } from './attack-rate';

describe('computeAttackRate', () => {
  it('calcule le taux d’attaque d’une source', () => {
    expect(computeAttackRate({ cases: 12, exposed: 20 })).toBe(0.6);
  });

  it('retourne null si les cas depassent les exposes', () => {
    expect(computeAttackRate({ cases: 25, exposed: 20 })).toBeNull();
  });

  it('retourne null pour une valeur non entiere ou manquante', () => {
    expect(
      computeAttackRate({ cases: 12 } as Record<string, number>),
    ).toBeNull();
  });
});
