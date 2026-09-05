export const EQUIPROBABILITY_FORMULA = 'equiprobability';

/**
 * Issue 1.18 — Correspondance Pascal-Fermat (1654).
 * Dans une situation d'equiprobabilite, P(evenement) = cas favorables / cas
 * possibles, un nombre compris entre 0 et 1.
 */
export function computeEquiprobability(
  measurements: Record<string, number>,
): number | null {
  const { favorableOutcomes, totalOutcomes } = measurements;
  if (favorableOutcomes === undefined || !totalOutcomes) return null;
  if (!Number.isInteger(favorableOutcomes) || !Number.isInteger(totalOutcomes)) {
    return null;
  }
  if (totalOutcomes <= 0 || favorableOutcomes < 0) return null;
  if (favorableOutcomes > totalOutcomes) return null;
  return favorableOutcomes / totalOutcomes;
}
