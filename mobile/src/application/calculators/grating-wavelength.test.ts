import { computeGratingWavelength } from './grating-wavelength';

describe('computeGratingWavelength', () => {
  it('applique lambda = d * sin(theta) / m', () => {
    // pas 1500 nm, angle 20 deg, ordre 1 -> ~513 nm (vert)
    expect(
      computeGratingWavelength({
        lineSpacingNm: 1500,
        diffractionAngleDeg: 20,
        order: 1,
      }),
    ).toBeCloseTo(513, 0);
  });

  it('retourne null pour un ordre non entier', () => {
    expect(
      computeGratingWavelength({
        lineSpacingNm: 1500,
        diffractionAngleDeg: 20,
        order: 1.5,
      }),
    ).toBeNull();
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeGratingWavelength({ lineSpacingNm: 1500, order: 1 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
