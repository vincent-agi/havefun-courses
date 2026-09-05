export const BRANCH_CURRENT_SUM_FORMULA = 'branch-current-sum';

/**
 * Issue 2.10 — Orsted (Copenhague, 1820) ; Ampere (Paris, 1820).
 * Loi des noeuds : dans un circuit avec derivations, l'intensite du tronc
 * commun est la somme des intensites des branches.
 */
export function computeBranchCurrentSum(
  measurements: Record<string, number>,
): number | null {
  const { branchCurrent1A, branchCurrent2A } = measurements;
  if (branchCurrent1A === undefined || branchCurrent2A === undefined) {
    return null;
  }
  if (branchCurrent1A < 0 || branchCurrent2A < 0) return null;
  if (!Number.isFinite(branchCurrent1A) || !Number.isFinite(branchCurrent2A)) {
    return null;
  }
  return branchCurrent1A + branchCurrent2A;
}
