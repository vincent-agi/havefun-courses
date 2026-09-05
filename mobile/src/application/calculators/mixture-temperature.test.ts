import { computeMixtureTemperature } from './mixture-temperature';

describe('computeMixtureTemperature', () => {
  it('melange a masses egales : moyenne des temperatures', () => {
    expect(
      computeMixtureTemperature({
        mass1G: 200,
        temp1C: 80,
        mass2G: 200,
        temp2C: 20,
      }),
    ).toBeCloseTo(50);
  });

  it('pondere par les masses', () => {
    expect(
      computeMixtureTemperature({
        mass1G: 300,
        temp1C: 80,
        mass2G: 100,
        temp2C: 20,
      }),
    ).toBeCloseTo(65);
  });

  it('retourne null si une masse est nulle ou manquante', () => {
    expect(
      computeMixtureTemperature({
        mass1G: 200,
        temp1C: 80,
        temp2C: 20,
      } as Record<string, number>),
    ).toBeNull();
  });
});
