import { computeDilutedAcidPh } from './diluted-acid-ph';

describe('computeDilutedAcidPh', () => {
  it('diluer 10 fois fait monter le pH d’une unite', () => {
    expect(
      computeDilutedAcidPh({ initialPh: 3, dilutionFactor: 10 }),
    ).toBeCloseTo(4);
  });

  it('le pH tend vers la neutralite sans la depasser', () => {
    expect(
      computeDilutedAcidPh({ initialPh: 5, dilutionFactor: 100000 }),
    ).toBe(7);
  });

  it('retourne null pour un pH initial deja neutre ou basique', () => {
    expect(
      computeDilutedAcidPh({ initialPh: 7, dilutionFactor: 10 }),
    ).toBeNull();
  });
});
