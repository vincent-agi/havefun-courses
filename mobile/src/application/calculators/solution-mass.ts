export const SOLUTION_MASS_FORMULA = 'solution-mass';

/**
 * Issue 3.4 — Lavoisier, conservation de la masse (Traite, 1789).
 * Lors d'une dissolution, rien ne se perd : masse de la solution
 * = masse du solute + masse du solvant.
 */
export function computeSolutionMass(
  measurements: Record<string, number>,
): number | null {
  const { soluteMassG, solventMassG } = measurements;
  if (soluteMassG === undefined || solventMassG === undefined) return null;
  if (soluteMassG < 0 || solventMassG <= 0) return null;
  return soluteMassG + solventMassG;
}
