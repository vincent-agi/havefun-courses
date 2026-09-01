import { BADGE_RULES } from './badge-rules.js';

function findRule(badgeKey: string) {
  const rule = BADGE_RULES.find((r) => r.badgeKey === badgeKey);
  if (!rule) throw new Error(`Rule ${badgeKey} not found`);
  return rule;
}

describe('scribe-kheops badge rule', () => {
  const rule = findRule('scribe-kheops');

  it('matches on the first validated Thalès submission', () => {
    expect(
      rule.matches({
        skillKey: 'thales',
        passionKey: 'skate',
        validatedCountForSkill: 1,
        validatedCountForPassion: 1,
      }),
    ).toBe(true);
  });

  it('does not match on a second validated Thalès submission', () => {
    expect(
      rule.matches({
        skillKey: 'thales',
        passionKey: 'skate',
        validatedCountForSkill: 2,
        validatedCountForPassion: 2,
      }),
    ).toBe(false);
  });

  it('does not match for a different skill', () => {
    expect(
      rule.matches({
        skillKey: 'ondes',
        passionKey: 'musique',
        validatedCountForSkill: 1,
        validatedCountForPassion: 1,
      }),
    ).toBe(false);
  });
});

describe('chef-atelier badge rule', () => {
  const rule = findRule('chef-atelier');

  it('matches on the 5th validated mécanique submission', () => {
    expect(
      rule.matches({
        skillKey: 'thales',
        passionKey: 'mecanique',
        validatedCountForSkill: 5,
        validatedCountForPassion: 5,
      }),
    ).toBe(true);
  });

  it('does not match before the 5th submission', () => {
    expect(
      rule.matches({
        skillKey: 'thales',
        passionKey: 'mecanique',
        validatedCountForSkill: 4,
        validatedCountForPassion: 4,
      }),
    ).toBe(false);
  });
});
