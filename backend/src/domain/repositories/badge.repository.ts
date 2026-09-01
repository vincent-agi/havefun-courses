import { Badge } from '../entities/badge.js';
import { EarnedBadge } from '../entities/earned-badge.js';

export const BADGE_REPOSITORY = Symbol('BADGE_REPOSITORY');

export interface BadgeRepository {
  findAll(): Promise<Badge[]>;
  findByKey(key: string): Promise<Badge | null>;
  findEarnedByUser(userId: string): Promise<EarnedBadge[]>;
  hasEarned(userId: string, badgeId: string): Promise<boolean>;
  /** Returns true if the badge was newly awarded, false if the user already had it. */
  award(userId: string, badgeId: string): Promise<boolean>;
}
