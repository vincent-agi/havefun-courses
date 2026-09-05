import { computePhenotypeRatio } from './phenotype-ratio';

describe('computePhenotypeRatio', () => {
  it('se rapproche de 3 pour une descendance mendelienne', () => {
    expect(
      computePhenotypeRatio({ dominantCount: 152, recessiveCount: 48 }),
    ).toBeCloseTo(3.17, 1);
  });

  it('retourne null si le compte recessif est nul', () => {
    expect(
      computePhenotypeRatio({ dominantCount: 152, recessiveCount: 0 }),
    ).toBeNull();
  });

  it('retourne null pour un effectif non entier ou manquant', () => {
    expect(
      computePhenotypeRatio({ dominantCount: 152 } as Record<string, number>),
    ).toBeNull();
  });
});
