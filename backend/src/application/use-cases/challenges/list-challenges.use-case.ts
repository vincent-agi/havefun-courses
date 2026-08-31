import { Inject, Injectable } from '@nestjs/common';
import {
  type ChallengeRepository,
  CHALLENGE_REPOSITORY,
} from '../../../domain/repositories/challenge.repository.js';
import {
  type PassionRepository,
  PASSION_REPOSITORY,
} from '../../../domain/repositories/passion.repository.js';
import {
  type SkillRepository,
  SKILL_REPOSITORY,
} from '../../../domain/repositories/skill.repository.js';
import { ChallengeFilters } from '../../../domain/entities/challenge.js';
import { ChallengeSummaryDto } from '../../dtos/challenge-summary.dto.js';

@Injectable()
export class ListChallengesUseCase {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(PASSION_REPOSITORY)
    private readonly passionRepository: PassionRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
  ) {}

  async execute(filters: ChallengeFilters): Promise<ChallengeSummaryDto[]> {
    const challenges = await this.challengeRepository.findMany(filters);

    const passionIds = [...new Set(challenges.map((c) => c.passionId))];
    const passions = await this.passionRepository.findByIds(passionIds);
    const passionsById = new Map(passions.map((p) => [p.id, p]));

    const summaries: ChallengeSummaryDto[] = [];
    for (const challenge of challenges) {
      const passion = passionsById.get(challenge.passionId);
      const skill = await this.skillRepository.findById(challenge.skillId);
      if (!passion || !skill) continue;

      summaries.push({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        schoolLevel: challenge.schoolLevel,
        durationMinutes: challenge.durationMinutes,
        passion,
        skill,
      });
    }
    return summaries;
  }
}
