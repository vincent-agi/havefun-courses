import { computeVolumeContraction } from './volume-contraction';

describe('computeVolumeContraction', () => {
  it('mesure la contraction eau + alcool', () => {
    expect(
      computeVolumeContraction({
        volumeAMl: 50,
        volumeBMl: 50,
        mixedVolumeMl: 96,
      }),
    ).toBeCloseTo(4);
  });

  it('vaut zero si les volumes s’ajoutent exactement', () => {
    expect(
      computeVolumeContraction({
        volumeAMl: 50,
        volumeBMl: 50,
        mixedVolumeMl: 100,
      }),
    ).toBe(0);
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeVolumeContraction({
        volumeAMl: 50,
        volumeBMl: 50,
      } as Record<string, number>),
    ).toBeNull();
  });
});
