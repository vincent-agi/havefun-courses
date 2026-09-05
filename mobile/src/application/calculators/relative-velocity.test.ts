import { computeRelativeVelocity } from './relative-velocity';

describe('computeRelativeVelocity', () => {
  it('un objet lache dans un mobile a une vitesse relative nulle', () => {
    expect(
      computeRelativeVelocity({
        objectVelocityMs: 4,
        observerVelocityMs: 4,
      }),
    ).toBe(0);
  });

  it('vue du sol, la vitesse relative est celle du mobile', () => {
    expect(
      computeRelativeVelocity({
        objectVelocityMs: 4,
        observerVelocityMs: 0,
      }),
    ).toBe(4);
  });

  it('retourne null si une vitesse est manquante', () => {
    expect(
      computeRelativeVelocity({ objectVelocityMs: 4 } as Record<string, number>),
    ).toBeNull();
  });
});
