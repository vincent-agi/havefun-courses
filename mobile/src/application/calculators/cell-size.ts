export const CELL_SIZE_FORMULA = 'cell-size';

/**
 * Issue 4.1 — Hooke, Micrographia (1665) ; Leeuwenhoek ; Schleiden et Schwann.
 * Au microscope, la taille d'une cellule = diametre du champ observe divise
 * par le nombre de cellules alignees en travers du champ.
 */
export function computeCellSize(
  measurements: Record<string, number>,
): number | null {
  const { fieldOfViewUm, cellsAcrossField } = measurements;
  if (!fieldOfViewUm || !cellsAcrossField) return null;
  if (fieldOfViewUm <= 0 || cellsAcrossField <= 0) return null;
  return fieldOfViewUm / cellsAcrossField;
}
