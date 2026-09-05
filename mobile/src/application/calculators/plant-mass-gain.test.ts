import { computePlantMassGain } from './plant-mass-gain';

describe('computePlantMassGain', () => {
  it('mesure la matiere produite par la plante', () => {
    expect(
      computePlantMassGain({ initialPlantMassG: 12, finalPlantMassG: 240 }),
    ).toBe(228);
  });

  it('retourne null si la plante a perdu de la masse', () => {
    expect(
      computePlantMassGain({ initialPlantMassG: 12, finalPlantMassG: 10 }),
    ).toBeNull();
  });

  it('retourne null si une masse est manquante', () => {
    expect(
      computePlantMassGain({ initialPlantMassG: 12 } as Record<string, number>),
    ).toBeNull();
  });
});
