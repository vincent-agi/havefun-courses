import { computeTelescopeMagnification } from './telescope-magnification';

describe('computeTelescopeMagnification', () => {
  it('calcule f_objectif / f_oculaire', () => {
    expect(
      computeTelescopeMagnification({
        objectiveFocalMm: 900,
        eyepieceFocalMm: 45,
      }),
    ).toBe(20);
  });

  it('retourne null si une focale est nulle ou manquante', () => {
    expect(
      computeTelescopeMagnification({ objectiveFocalMm: 900 } as Record<
        string,
        number
      >),
    ).toBeNull();
    expect(
      computeTelescopeMagnification({
        objectiveFocalMm: 900,
        eyepieceFocalMm: 0,
      }),
    ).toBeNull();
  });
});
