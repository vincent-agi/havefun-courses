import { computeTriangulationDistance } from './triangulation-distance';

describe('computeTriangulationDistance', () => {
  it('triangle equilateral (60 deg / 60 deg) : AC = base', () => {
    expect(
      computeTriangulationDistance({
        baseM: 30,
        angleADeg: 60,
        angleBDeg: 60,
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
