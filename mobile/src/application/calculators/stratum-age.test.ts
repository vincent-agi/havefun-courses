import { computeStratumAge } from './stratum-age';

describe('computeStratumAge', () => {
  it('deduit l’age d’une strate de sa profondeur', () => {
    // 45 cm a 1,5 cm/siecle -> 3000 ans
    expect(
      computeStratumAge({ depthCm: 45, sedimentationRateCmPerCentury: 1.5 }),
    ).toBe(3000);
  });

  it('retourne null si la vitesse de sedimentation est nulle', () => {
    expect(
      computeStratumAge({ depthCm: 45, sedimentationRateCmPerCentury: 0 }),
    ).toBeNull();
  });
});
