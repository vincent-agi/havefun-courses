import { computeSharedTraitRatio } from './shared-trait-ratio';

describe('computeSharedTraitRatio', () => {
  it('calcule la part d’attributs partages', () => {
    expect(
      computeSharedTraitRatio({ sharedTraits: 6, observedTraits: 8 }),
    ).toBe(0.75);
  });

  it('retourne null si les attributs communs depassent les attributs observes', () => {
    expect(
      computeSharedTraitRatio({ sharedTraits: 9, observedTraits: 8 }),
    ).toBeNull();
  });

  it('retourne null pour une valeur non entiere ou manquante', () => {
    expect(
      computeSharedTraitRatio({ sharedTraits: 6 } as Record<string, number>),
    ).toBeNull();
  });
});
