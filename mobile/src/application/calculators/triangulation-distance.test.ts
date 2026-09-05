import { computeTriangulationDistance } from './triangulation-distance';

describe('computeTriangulationDistance', () => {
  it('triangle isocele : angles egaux -> AC = base', () => {
    expect(
      computeTriangulationDistance({
        baseM: 30,
        angleADeg: 70,
        angleBDeg: 70,
      }),
    ).toBeCloseTo(30);
  });

  it('calcule une distance inaccessible', () => {
    expect(
      computeTriangulationDistance({
        baseM: 30,
        angleADeg: 45,
        angleBDeg: 60,
      }),
    ).toBeCloseTo(26.9, 1);
  });

  it('retourne null si la somme des angles depasse 180 deg', () => {
    expect(
      computeTriangulationDistance({
        baseM: 30,
        angleADeg: 120,
        angleBDeg: 70,
      }),
    ).toBeNull();
  });
});
