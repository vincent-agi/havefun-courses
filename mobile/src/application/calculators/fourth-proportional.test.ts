import { computeFourthProportional } from './fourth-proportional';

describe('computeFourthProportional', () => {
  it('applique la regle de trois (2 kg -> 3 EUR, donc 5 kg -> 7.5 EUR)', () => {
    expect(
      computeFourthProportional({
        referenceInput: 2,
        referenceOutput: 3,
        targetInput: 5,
      }),
    ).toBe(7.5);
  });

  it('retourne null si une grandeur est manquante', () => {
    expect(
      computeFourthProportional({
        referenceInput: 2,
        referenceOutput: 3,
      } as Record<string, number>),
    ).toBeNull();
  });

  it('retourne null si la reference d’entree vaut zero', () => {
    expect(
      computeFourthProportional({
        referenceInput: 0,
        referenceOutput: 3,
        targetInput: 5,
      }),
    ).toBeNull();
  });
});
