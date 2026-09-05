export const PINHOLE_IMAGE_SIZE_FORMULA = 'pinhole-image-size';

/**
 * Issue 2.7 — Ibn al-Haytham (Alhazen), Kitab al-Manazir (Le Caire, v. 1021).
 * Chambre noire : la lumiere se propageant en ligne droite, la taille de
 * l'image = taille de l'objet * profondeur de la boite / distance de l'objet.
 */
export function computePinholeImageSize(
  measurements: Record<string, number>,
): number | null {
  const { objectSizeM, objectDistanceM, boxDepthM } = measurements;
  if (!objectSizeM || !objectDistanceM || !boxDepthM) return null;
  if (objectSizeM <= 0 || objectDistanceM <= 0 || boxDepthM <= 0) return null;
  return (objectSizeM * boxDepthM) / objectDistanceM;
}
