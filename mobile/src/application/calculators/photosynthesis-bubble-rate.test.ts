import { computePhotosynthesisBubbleRate } from './photosynthesis-bubble-rate';

describe('computePhotosynthesisBubbleRate', () => {
  it('calcule le debit de bulles par minute', () => {
    expect(
      computePhotosynthesisBubbleRate({
        bubbleCount: 84,
        durationMinutes: 3,
      }),
    ).toBe(28);
  });

  it('vaut zero a l’ombre (aucune bulle)', () => {
    expect(
      computePhotosynthesisBubbleRate({
        bubbleCount: 0,
        durationMinutes: 3,
      }),
    ).toBe(0);
  });

  it('retourne null si la duree est nulle ou manquante', () => {
    expect(
      computePhotosynthesisBubbleRate({ bubbleCount: 84 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
