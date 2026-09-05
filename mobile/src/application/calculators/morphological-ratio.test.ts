import { computeMorphologicalRatio } from './morphological-ratio';

describe('computeMorphologicalRatio', () => {
  it('compare une structure fossile a son homologue actuel', () => {
    expect(
      computeMorphologicalRatio({
        fossilMeasureMm: 130,
        livingMeasureMm: 100,
      }),
    ).toBeCloseTo(1.3);
  });

  it('retourne null si une mesure est nulle ou manquante', () => {
    expect(
      computeMorphologicalRatio({ fossilMeasureMm: 130 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
