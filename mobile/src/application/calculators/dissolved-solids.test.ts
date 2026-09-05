import { computeDissolvedSolids } from './dissolved-solids';

describe('computeDissolvedSolids', () => {
  it('calcule le residu sec en mg/L', () => {
    expect(
      computeDissolvedSolids({ residueMassMg: 15, sampleVolumeL: 0.05 }),
    ).toBe(300);
  });

  it('accepte un residu nul (eau tres pure)', () => {
    expect(
      computeDissolvedSolids({ residueMassMg: 0, sampleVolumeL: 0.1 }),
    ).toBe(0);
  });

  it('retourne null si le volume est nul ou manquant', () => {
    expect(
      computeDissolvedSolids({ residueMassMg: 15 } as Record<string, number>),
    ).toBeNull();
  });
});
