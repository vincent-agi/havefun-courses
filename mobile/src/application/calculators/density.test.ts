import { computeDensity } from './density';

describe('computeDensity', () => {
  it('calcule masse / volume deplace', () => {
    expect(computeDensity({ massG: 270, displacedVolumeCm3: 100 })).toBe(2.7);
  });

  it('un corps de densite < 1 flotte (bois)', () => {
    expect(computeDensity({ massG: 60, displacedVolumeCm3: 100 })).toBeLessThan(
      1,
    );
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(computeDensity({ massG: 270 } as Record<string, number>)).toBeNull();
    expect(computeDensity({ massG: 270, displacedVolumeCm3: 0 })).toBeNull();
  });
});
