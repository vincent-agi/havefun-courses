import { computePiFromCircle } from './pi-from-circle';

describe('computePiFromCircle', () => {
  it('estime π à partir du périmètre et du diamètre', () => {
    expect(
      computePiFromCircle({ perimeterM: 3.1416, diameterM: 1 }),
    ).toBeCloseTo(3.1416);
  });

  it('reste stable quelle que soit la taille mesurée', () => {
    expect(computePiFromCircle({ perimeterM: 6.2832, diameterM: 2 })).toBeCloseTo(
      3.1416,
    );
  });

  it('retourne null si une mesure est manquante', () => {
    expect(
      computePiFromCircle({ perimeterM: 3.14 } as Record<string, number>),
    ).toBeNull();
  });

  it('retourne null si le diamètre vaut zéro', () => {
    expect(computePiFromCircle({ perimeterM: 3.14, diameterM: 0 })).toBeNull();
  });
});
