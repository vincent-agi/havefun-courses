import { computeThalesShadowRatio } from './thales-shadow-ratio';

describe('computeThalesShadowRatio', () => {
  it('calcule la hauteur cible à partir du ratio bâton/ombre', () => {
    const result = computeThalesShadowRatio({
      stickHeightM: 1,
      stickShadowM: 2,
      targetShadowM: 10,
    });
    expect(result).toBe(5);
  });

  it('retourne null si une mesure est manquante', () => {
    const result = computeThalesShadowRatio({
      stickHeightM: 1,
      stickShadowM: 2,
    } as Record<string, number>);
    expect(result).toBeNull();
  });

  it('retourne null si une mesure vaut zéro', () => {
    const result = computeThalesShadowRatio({
      stickHeightM: 0,
      stickShadowM: 2,
      targetShadowM: 10,
    });
    expect(result).toBeNull();
  });
});
