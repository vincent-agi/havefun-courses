import { computeCardiacOutput } from './cardiac-output';

describe('computeCardiacOutput', () => {
  it('calcule le debit cardiaque (mL/min)', () => {
    expect(
      computeCardiacOutput({ strokeVolumeMl: 70, heartRateBpm: 70 }),
    ).toBe(4900);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeCardiacOutput({ strokeVolumeMl: 70 } as Record<string, number>),
    ).toBeNull();
  });
});
