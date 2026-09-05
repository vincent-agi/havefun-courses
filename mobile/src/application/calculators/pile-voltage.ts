export const PILE_VOLTAGE_FORMULA = 'pile-voltage';

/**
 * Issue 2.9 — Volta, pile voltaique (Pavie, 1799-1800).
 * Empiler des elements identiques additionne les tensions :
 * tension de la pile = nombre d'elements * tension par element.
 */
export function computePileVoltage(
  measurements: Record<string, number>,
): number | null {
  const { cellCount, voltagePerCellV } = measurements;
  if (!cellCount || !voltagePerCellV) return null;
  if (!Number.isInteger(cellCount) || cellCount < 1 || voltagePerCellV <= 0) {
    return null;
  }
  return cellCount * voltagePerCellV;
}
