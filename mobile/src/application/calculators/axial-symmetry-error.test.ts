import { computeAxialSymmetryError } from './axial-symmetry-error';

describe('computeAxialSymmetryError', () => {
  it('vaut zero quand le point et son image sont equidistants de l’axe', () => {
    expect(
      computeAxialSymmetryError({
        pointDistanceToAxisM: 0.8,
        imageDistanceToAxisM: 0.8,
      }),
    ).toBe(0);
  });

  it('mesure l’ecart de trace', () => {
    expect(
      computeAxialSymmetryError({
        pointDistanceToAxisM: 0.8,
        imageDistanceToAxisM: 0.95,
      }),
    ).toBeCloseTo(0.15);
  });

  it('retourne null si une distance est manquante', () => {
    expect(
      computeAxialSymmetryError({ pointDistanceToAxisM: 0.8 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
