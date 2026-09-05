export const RECTANGLE_DIAGONAL_FORMULA = 'rectangle-diagonal';

/**
 * Issue 1.2 — Harpédonaptes d'Égypte (Hérodote, Ve s. av. J.-C.).
 * Un quadrilatère dont les deux diagonales sont égales à cette longueur
 * attendue est un vrai rectangle (angles droits garantis).
 */
export function computeRectangleDiagonal(
  measurements: Record<string, number>,
): number | null {
  const { lengthM, widthM } = measurements;
  if (!lengthM || !widthM || lengthM <= 0 || widthM <= 0) return null;
  return Math.sqrt(lengthM * lengthM + widthM * widthM);
}
