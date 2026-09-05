import { computeLavaFlowSpeed } from './lava-flow-speed';

describe('computeLavaFlowSpeed', () => {
  it('calcule la vitesse du front de coulee', () => {
    expect(
      computeLavaFlowSpeed({ flowDistanceM: 1.2, durationS: 30 }),
    ).toBeCloseTo(0.04);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeLavaFlowSpeed({ flowDistanceM: 1.2 } as Record<string, number>),
    ).toBeNull();
  });
});
