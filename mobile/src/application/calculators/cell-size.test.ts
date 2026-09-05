import { computeCellSize } from './cell-size';

describe('computeCellSize', () => {
  it('estime la taille d’une cellule dans le champ du microscope', () => {
    // champ de 400 µm, 8 cellules d'oignon alignees -> 50 µm chacune
    expect(
      computeCellSize({ fieldOfViewUm: 400, cellsAcrossField: 8 }),
    ).toBe(50);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeCellSize({ fieldOfViewUm: 400 } as Record<string, number>),
    ).toBeNull();
    expect(
      computeCellSize({ fieldOfViewUm: 400, cellsAcrossField: 0 }),
    ).toBeNull();
  });
});
