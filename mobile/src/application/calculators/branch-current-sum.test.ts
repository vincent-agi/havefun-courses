import { computeBranchCurrentSum } from './branch-current-sum';

describe('computeBranchCurrentSum', () => {
  it('somme les intensites des branches (loi des noeuds)', () => {
    expect(
      computeBranchCurrentSum({ branchCurrent1A: 0.12, branchCurrent2A: 0.08 }),
    ).toBeCloseTo(0.2);
  });

  it('retourne null pour une intensite negative', () => {
    expect(
      computeBranchCurrentSum({ branchCurrent1A: -0.1, branchCurrent2A: 0.08 }),
    ).toBeNull();
  });

  it('retourne null si une branche est manquante', () => {
    expect(
      computeBranchCurrentSum({ branchCurrent1A: 0.12 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
