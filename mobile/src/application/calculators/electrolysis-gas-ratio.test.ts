import { computeElectrolysisGasRatio } from './electrolysis-gas-ratio';

describe('computeElectrolysisGasRatio', () => {
  it('retrouve le rapport 2 pour 1', () => {
    expect(
      computeElectrolysisGasRatio({
        hydrogenVolumeMl: 12,
        oxygenVolumeMl: 6,
      }),
    ).toBe(2);
  });

  it('retourne null si un volume est nul ou manquant', () => {
    expect(
      computeElectrolysisGasRatio({ hydrogenVolumeMl: 12 } as Record<
        string,
        number
      >),
    ).toBeNull();
    expect(
      computeElectrolysisGasRatio({
        hydrogenVolumeMl: 12,
        oxygenVolumeMl: 0,
      }),
    ).toBeNull();
  });
});
