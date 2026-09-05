import { computeEpicentralDistance } from './epicentral-distance';

describe('computeEpicentralDistance', () => {
  it('applique la regle d’Omori (8 km/s d’ecart S-P)', () => {
    expect(computeEpicentralDistance({ sMinusPSeconds: 5 })).toBe(40);
  });

  it('retourne null si l’ecart est nul ou manquant', () => {
    expect(computeEpicentralDistance({ sMinusPSeconds: 0 })).toBeNull();
    expect(
      computeEpicentralDistance({} as Record<string, number>),
    ).toBeNull();
  });
});
