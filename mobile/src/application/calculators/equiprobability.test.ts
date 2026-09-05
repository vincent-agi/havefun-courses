import { computeEquiprobability } from './equiprobability';

describe('computeEquiprobability', () => {
  it('calcule P("exactement un pile" sur deux pieces) = 2/4', () => {
    expect(
      computeEquiprobability({ favorableOutcomes: 2, totalOutcomes: 4 }),
    ).toBe(0.5);
  });

  it('gere les evenements certain et impossible', () => {
    expect(
      computeEquiprobability({ favorableOutcomes: 0, totalOutcomes: 6 }),
    ).toBe(0);
    expect(
      computeEquiprobability({ favorableOutcomes: 6, totalOutcomes: 6 }),
    ).toBe(1);
  });

  it('retourne null si les cas favorables depassent les cas possibles', () => {
    expect(
      computeEquiprobability({ favorableOutcomes: 7, totalOutcomes: 6 }),
    ).toBeNull();
  });
});
