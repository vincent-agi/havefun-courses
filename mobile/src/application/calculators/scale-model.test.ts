import { computeScaleModel } from './scale-model';

describe('computeScaleModel', () => {
  it('reduit une grandeur reelle a l’echelle choisie', () => {
    // 1 cm de maquette = 10 000 km ; la Terre (~12 742 km) fait ~1,27 cm
    expect(
      computeScaleModel({ realValueKm: 12742, kmPerCm: 10000 }),
    ).toBeCloseTo(1.2742);
  });

  it('retourne null si une valeur est nulle ou manquante', () => {
    expect(
      computeScaleModel({ realValueKm: 12742 } as Record<string, number>),
    ).toBeNull();
    expect(computeScaleModel({ realValueKm: 12742, kmPerCm: 0 })).toBeNull();
  });
});
