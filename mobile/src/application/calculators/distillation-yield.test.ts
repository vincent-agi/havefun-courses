import { computeDistillationYield } from './distillation-yield';

describe('computeDistillationYield', () => {
  it('calcule le rendement en pourcentage', () => {
    expect(
      computeDistillationYield({
        distillateVolumeMl: 45,
        initialVolumeMl: 200,
      }),
    ).toBeCloseTo(22.5);
  });

  it('retourne null si le distillat depasse le volume initial', () => {
    expect(
      computeDistillationYield({
        distillateVolumeMl: 250,
        initialVolumeMl: 200,
      }),
    ).toBeNull();
  });

  it('retourne null si le volume initial est manquant', () => {
    expect(
      computeDistillationYield({ distillateVolumeMl: 45 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
