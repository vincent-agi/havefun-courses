export const GRATING_WAVELENGTH_FORMULA = 'grating-wavelength';

/**
 * Issue 2.12 — Newton, decomposition de la lumiere blanche (prisme, 1666).
 * Avec un reseau (ou un CD), l'ecart angulaire d'une couleur donne sa longueur
 * d'onde : lambda = pas du reseau * sin(angle) / ordre de diffraction.
 */
export function computeGratingWavelength(
  measurements: Record<string, number>,
): number | null {
  const { lineSpacingNm, diffractionAngleDeg, order } = measurements;
  if (!lineSpacingNm || !diffractionAngleDeg || !order) return null;
  if (
    lineSpacingNm <= 0 ||
    diffractionAngleDeg <= 0 ||
    diffractionAngleDeg >= 90 ||
    !Number.isInteger(order) ||
    order < 1
  ) {
    return null;
  }
  return (
    (lineSpacingNm * Math.sin((diffractionAngleDeg * Math.PI) / 180)) / order
  );
}
