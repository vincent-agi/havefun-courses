export const SQUARE_DIAGONAL_FORMULA = 'square-diagonal';

/**
 * Issue 1.14 — Incommensurabilite de la diagonale (Hippase, Ve s. av. J.-C.).
 * La diagonale d'un carre de cote c vaut c * racine(2), un nombre qu'on ne
 * peut qu'encadrer.
 */
export function computeSquareDiagonal(
  measurements: Record<string, number>,
): number | null {
  const { sideM } = measurements;
  if (!sideM || sideM <= 0) return null;
  return sideM * Math.SQRT2;
}
