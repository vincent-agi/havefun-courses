export const SHARED_TRAIT_RATIO_FORMULA = 'shared-trait-ratio';

/**
 * Issue 4.2 — Linne, Systema Naturae (1735) ; Hennig, cladistique (1950).
 * On classe par ce que les etres ont en commun : la part d'attributs partages
 * entre deux especes = attributs communs / attributs observes.
 */
export function computeSharedTraitRatio(
  measurements: Record<string, number>,
): number | null {
  const { sharedTraits, observedTraits } = measurements;
  if (sharedTraits === undefined || !observedTraits) return null;
  if (
    sharedTraits < 0 ||
    observedTraits <= 0 ||
    sharedTraits > observedTraits ||
    !Number.isInteger(sharedTraits) ||
    !Number.isInteger(observedTraits)
  ) {
    return null;
  }
  return sharedTraits / observedTraits;
}
