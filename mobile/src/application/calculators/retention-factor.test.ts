import { computeRetentionFactor } from './retention-factor';

describe('computeRetentionFactor', () => {
  it('calcule Rf = migration du solute / front du solvant', () => {
    expect(
      computeRetentionFactor({ soluteMigrationMm: 27, solventFrontMm: 60 }),
    ).toBeCloseTo(0.45);
  });

  it('retourne null si le solute depasse le front de solvant', () => {
    expect(
      computeRetentionFactor({ soluteMigrationMm: 70, solventFrontMm: 60 }),
    ).toBeNull();
  });

  it('retourne null si le front de solvant est manquant', () => {
    expect(
      computeRetentionFactor({ soluteMigrationMm: 27 } as Record<
        string,
        number
      >),
    ).toBeNull();
  });
});
