import { computeDiskArea } from './disk-area';

describe('computeDiskArea', () => {
  it('calcule pi * R^2 pour un cercle de rayon 1 m', () => {
    expect(computeDiskArea({ radiusM: 1 })).toBeCloseTo(Math.PI);
  });

  it('calcule l’aire pour un rayon de 2 m', () => {
    expect(computeDiskArea({ radiusM: 2 })).toBeCloseTo(12.566, 3);
  });

  it('retourne null si le rayon est manquant ou nul', () => {
    expect(computeDiskArea({} as Record<string, number>)).toBeNull();
    expect(computeDiskArea({ radiusM: 0 })).toBeNull();
  });
});
