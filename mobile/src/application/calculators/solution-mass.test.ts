import { computeSolutionMass } from './solution-mass';

describe('computeSolutionMass', () => {
  it('additionne solute et solvant (masse conservee)', () => {
    expect(
      computeSolutionMass({ soluteMassG: 20, solventMassG: 100 }),
    ).toBe(120);
  });

  it('le solute invisible n’est pas perdu (masse inchangee)', () => {
    expect(
      computeSolutionMass({ soluteMassG: 0, solventMassG: 100 }),
    ).toBe(100);
  });

  it('retourne null si une masse est manquante', () => {
    expect(
      computeSolutionMass({ soluteMassG: 20 } as Record<string, number>),
    ).toBeNull();
  });
});
