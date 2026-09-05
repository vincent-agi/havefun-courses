import { computePinholeImageSize } from './pinhole-image-size';

describe('computePinholeImageSize', () => {
  it('applique la relation des triangles semblables', () => {
    // objet de 1,7 m a 10 m, boite de 0,3 m -> image de 0,051 m
    expect(
      computePinholeImageSize({
        objectSizeM: 1.7,
        objectDistanceM: 10,
        boxDepthM: 0.3,
      }),
    ).toBeCloseTo(0.051);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computePinholeImageSize({
        objectSizeM: 1.7,
        objectDistanceM: 10,
      } as Record<string, number>),
    ).toBeNull();
  });
});
