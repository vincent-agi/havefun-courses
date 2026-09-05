export const SCALE_MODEL_FORMULA = 'scale-model';

/**
 * Issue 2.5 — Copernic (1543) ; Galilee a la lunette (1609-1610).
 * Maquette du Systeme solaire : taille sur la maquette = grandeur reelle
 * divisee par le nombre de km represente par 1 cm de maquette.
 */
export function computeScaleModel(
  measurements: Record<string, number>,
): number | null {
  const { realValueKm, kmPerCm } = measurements;
  if (!realValueKm || !kmPerCm || realValueKm <= 0 || kmPerCm <= 0) return null;
  return realValueKm / kmPerCm;
}
