import { computeLowestCommonMultiple } from './lowest-common-multiple';

describe('computeLowestCommonMultiple', () => {
  it('trouve le PPCM de deux engrenages 12 et 18', () => {
    expect(computeLowestCommonMultiple({ a: 12, b: 18 })).toBe(36);
  });

  it('gere des nombres premiers entre eux', () => {
    expect(computeLowestCommonMultiple({ a: 7, b: 5 })).toBe(35);
  });

  it('retourne null pour une entree non entiere ou nulle', () => {
    expect(computeLowestCommonMultiple({ a: 12, b: 0 })).toBeNull();
    expect(computeLowestCommonMultiple({ a: 12.5, b: 4 })).toBeNull();
  });
});
