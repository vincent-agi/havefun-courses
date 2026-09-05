import { computeGrainCount } from './grain-count';

describe('computeGrainCount', () => {
  it('multiplie le volume par la densite de grains', () => {
    expect(
      computeGrainCount({ containerVolumeCm3: 8000, grainsPerCm3: 15000 }),
    ).toBe(120_000_000);
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeGrainCount({ containerVolumeCm3: 8000 } as Record<string, number>),
    ).toBeNull();
  });

  it('retourne null pour une valeur nulle ou negative', () => {
    expect(
      computeGrainCount({ containerVolumeCm3: 0, grainsPerCm3: 15000 }),
    ).toBeNull();
  });
});
