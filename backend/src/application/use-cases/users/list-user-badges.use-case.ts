import { Inject, Injectable } from '@nestjs/common';
import {
  type BadgeRepository,
  BADGE_REPOSITORY,
} from '../../../domain/repositories/badge.repository.js';
import { BadgeStatusDto } from '../../dtos/badge-status.dto.js';

@Injectable()
export class ListUserBadgesUseCase {
  constructor(
    @Inject(BADGE_REPOSITORY)
    private readonly badgeRepository: BadgeRepository,
  ) {}

  async execute(userId: string): Promise<BadgeStatusDto[]> {
    const [allBadges, earnedBadges] = await Promise.all([
      this.badgeRepository.findAll(),
      this.badgeRepository.findEarnedByUser(userId),
    ]);

    const earnedByBadgeId = new Map(
      earnedBadges.map((eb) => [eb.badge.id, eb.earnedAt]),
    );

    return allBadges.map((badge) => ({
      id: badge.id,
      key: badge.key,
      label: badge.label,
      description: badge.description,
      iconUrl: badge.iconUrl,
      earned: earnedByBadgeId.has(badge.id),
      earnedAt: earnedByBadgeId.get(badge.id) ?? null,
    }));
  }
}
