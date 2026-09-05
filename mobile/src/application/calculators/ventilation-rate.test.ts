import { computeVentilationRate } from './ventilation-rate';

describe('computeVentilationRate', () => {
  it('calcule le debit ventilatoire au repos', () => {
    expect(
      computeVentilationRate({ breathVolumeMl: 500, breathsPerMinute: 15 }),
    ).toBe(7500);
  });

  it('augmente a l’effort', () => {
    const rest = computeVentilationRate({
      breathVolumeMl: 500,
      breathsPerMinute: 15,
    }) as number;
    const effort = computeVentilationRate({
      breathVolumeMl: 1500,
      breathsPerMinute: 30,
    }) as number;
    expect(effort).toBeGreaterThan(rest);
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computeVentilationRate({ breathVolumeMl: 500 } as Record<string, number>),
    ).toBeNull();
  });
});
