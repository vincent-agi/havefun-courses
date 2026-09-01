export interface BadgeRuleContext {
  skillKey: string;
  passionKey: string;
  validatedCountForSkill: number;
  validatedCountForPassion: number;
}

export interface BadgeRule {
  badgeKey: string;
  matches(context: BadgeRuleContext): boolean;
}

export const BADGE_RULES: BadgeRule[] = [
  {
    badgeKey: 'scribe-kheops',
    matches: (context) =>
      context.skillKey === 'thales' && context.validatedCountForSkill === 1,
  },
  {
    badgeKey: 'chef-atelier',
    matches: (context) =>
      context.passionKey === 'mecanique' &&
      context.validatedCountForPassion === 5,
  },
];
