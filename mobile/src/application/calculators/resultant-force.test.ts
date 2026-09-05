import { computeResultantForce } from './resultant-force';

describe('computeResultantForce', () => {
  it('compose deux forces perpendiculaires (3 N et 4 N -> 5 N)', () => {
    expect(computeResultantForce({ forceXN: 3, forceYN: 4 })).toBe(5);
  });

  it('renvoie la force restante quand une composante est nulle', () => {
    expect(computeResultantForce({ forceXN: 0, forceYN: 7 })).toBe(7);
  });

  it('retourne null si une composante est manquante', () => {
    expect(
      computeResultantForce({ forceXN: 3 } as Record<string, number>),
    ).toBeNull();
  });
});
