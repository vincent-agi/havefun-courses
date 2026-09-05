import { computeNetBalance } from './net-balance';

describe('computeNetBalance', () => {
  it('additionne fortunes et dettes', () => {
    expect(computeNetBalance({ credits: 12, debits: 5 })).toBe(7);
  });

  it('peut renvoyer un solde negatif (a decouvert)', () => {
    expect(computeNetBalance({ credits: 3, debits: 10 })).toBe(-7);
  });

  it('retourne null si une entree est manquante', () => {
    expect(
      computeNetBalance({ credits: 12 } as Record<string, number>),
    ).toBeNull();
  });
});
