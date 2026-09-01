import { Inject, Injectable } from '@nestjs/common';
import {
  type SubmissionRepository,
  SUBMISSION_REPOSITORY,
} from '../../../domain/repositories/submission.repository.js';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import {
  type SkillRepository,
  SKILL_REPOSITORY,
} from '../../../domain/repositories/skill.repository.js';
import {
  type PassionRepository,
  PASSION_REPOSITORY,
} from '../../../domain/repositories/passion.repository.js';
import {
  type BadgeRepository,
  BADGE_REPOSITORY,
} from '../../../domain/repositories/badge.repository.js';
import {
  Submission,
  SubmissionStatus,
} from '../../../domain/entities/submission.js';
import { Challenge } from '../../../domain/entities/challenge.js';
import { Badge } from '../../../domain/entities/badge.js';
import { BADGE_RULES } from '../../gamification/badge-rules.js';
import { ValidationResultDto } from '../../dtos/validation-result.dto.js';

@Injectable()
export class ValidateSubmissionUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: SubmissionRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
    @Inject(PASSION_REPOSITORY)
    private readonly passionRepository: PassionRepository,
    @Inject(BADGE_REPOSITORY)
    private readonly badgeRepository: BadgeRepository,
  ) {}

  async execute(
    submission: Submission,
    challenge: Challenge,
  ): Promise<ValidationResultDto> {
    await this.submissionRepository.updateStatus(
      submission.id,
      SubmissionStatus.VALIDATED,
    );
    const user = await this.userRepository.addXp(
      submission.userId,
      challenge.xpReward,
    );

    const [skill, passions, validatedCountForSkill, validatedCountForPassion] =
      await Promise.all([
        this.skillRepository.findById(challenge.skillId),
        this.passionRepository.findByIds([challenge.passionId]),
        this.submissionRepository.countByUserAndSkill(
          submission.userId,
          challenge.skillId,
          SubmissionStatus.VALIDATED,
        ),
        this.submissionRepository.countByUserAndPassion(
          submission.userId,
          challenge.passionId,
          SubmissionStatus.VALIDATED,
        ),
      ]);
    const passion = passions[0];

    const badgesAwarded: Badge[] = [];
    if (skill && passion) {
      const context = {
        skillKey: skill.key,
        passionKey: passion.key,
        validatedCountForSkill,
        validatedCountForPassion,
      };

      for (const rule of BADGE_RULES) {
        if (!rule.matches(context)) continue;
        const badge = await this.badgeRepository.findByKey(rule.badgeKey);
        if (!badge) continue;
        const newlyAwarded = await this.badgeRepository.award(
          submission.userId,
          badge.id,
        );
        if (newlyAwarded) badgesAwarded.push(badge);
      }
    }

    return {
      xpAwarded: challenge.xpReward,
      totalXp: user.xpPoints,
      badgesAwarded,
    };
  }
}
