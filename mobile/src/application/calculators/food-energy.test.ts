import { computeFoodEnergy } from './food-energy';

describe('computeFoodEnergy', () => {
  it('calcule l’energie transferee a l’eau', () => {
    // 20 g d'eau, +18 degres -> 1512 J
    expect(
      computeFoodEnergy({ waterMassG: 20, temperatureRiseC: 18 }),
    ).toBeCloseTo(1512);
  });

  it('retourne null si l’elevation de temperature est nulle', () => {
    expect(
      computeFoodEnergy({ waterMassG: 20, temperatureRiseC: 0 }),
    ).toBeNull();
  });

  it('retourne null si la masse d’eau est manquante', () => {
    expect(
      computeFoodEnergy({ temperatureRiseC: 18 } as Record<string, number>),
    ).toBeNull();
  });
});
