import { computeConductivityRatio } from './conductivity-ratio';

describe('computeConductivityRatio', () => {
  it('l’eau salee conduit bien mieux que l’eau distillee', () => {
    expect(
      computeConductivityRatio({
        solutionCurrentMa: 45,
        referenceCurrentMa: 0.5,
      }),
    ).toBe(90);
  });

  it('retourne null si l’intensite de reference est nulle', () => {
    expect(
      computeConductivityRatio({
        solutionCurrentMa: 45,
        referenceCurrentMa: 0,
      }),
    ).toBeNull();
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeConductivityRatio({ solutionCurrentMa: 45 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
