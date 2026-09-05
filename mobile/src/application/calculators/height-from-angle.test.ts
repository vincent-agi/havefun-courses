import { computeHeightFromAngle } from './height-from-angle';

describe('computeHeightFromAngle', () => {
  it('vise a 45 deg : hauteur = distance + hauteur des yeux', () => {
    expect(
      computeHeightFromAngle({
        distanceM: 10,
        elevationAngleDeg: 45,
        eyeHeightM: 1.6,
      }),
    ).toBeCloseTo(11.6);
  });

  it('accepte l’absence de hauteur des yeux (0 par defaut)', () => {
    expect(
      computeHeightFromAngle({ distanceM: 10, elevationAngleDeg: 45 }),
    ).toBeCloseTo(10);
  });

  it('retourne null pour un angle hors ]0 ; 90[', () => {
    expect(
      computeHeightFromAngle({ distanceM: 10, elevationAngleDeg: 90 }),
    ).toBeNull();
  });
});
