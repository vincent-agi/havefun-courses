export const RELATIVE_VELOCITY_FORMULA = 'relative-velocity';

/**
 * Issue 2.1 — Galilee, Dialogue sur les deux grands systemes du monde (1632).
 * Le mouvement est relatif au referentiel : vitesse d'un objet vue par un
 * observateur = vitesse de l'objet - vitesse de l'observateur (meme axe).
 */
export function computeRelativeVelocity(
  measurements: Record<string, number>,
): number | null {
  const { objectVelocityMs, observerVelocityMs } = measurements;
  if (
    objectVelocityMs === undefined ||
    observerVelocityMs === undefined ||
    !Number.isFinite(objectVelocityMs) ||
    !Number.isFinite(observerVelocityMs)
  ) {
    return null;
  }
  return objectVelocityMs - observerVelocityMs;
}
