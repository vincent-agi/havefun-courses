import { computeVaccineEfficacy } from './vaccine-efficacy';

describe('computeVaccineEfficacy', () => {
  it('un lot vaccine totalement protege -> 100 %', () => {
    expect(
      computeVaccineEfficacy({
        controlAttackRate: 1,
        vaccinatedAttackRate: 0,
      }),
    ).toBe(100);
  });

  it('protection partielle', () => {
    expect(
      computeVaccineEfficacy({
        controlAttackRate: 0.8,
        vaccinatedAttackRate: 0.2,
      }),
    ).toBeCloseTo(75);
  });

  it('retourne null si le taux temoin est nul ou manquant', () => {
    expect(
      computeVaccineEfficacy({
        vaccinatedAttackRate: 0.2,
      } as Record<string, number>),
    ).toBeNull();
  });
});
