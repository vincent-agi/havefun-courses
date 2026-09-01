import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type SubmissionRepository,
  SUBMISSION_REPOSITORY,
} from '../../../domain/repositories/submission.repository.js';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import {
  type ChallengeRepository,
  CHALLENGE_REPOSITORY,
} from '../../../domain/repositories/challenge.repository.js';
import {
  type SkillRepository,
  SKILL_REPOSITORY,
} from '../../../domain/repositories/skill.repository.js';
import {
  type PassionRepository,
  PASSION_REPOSITORY,
} from '../../../domain/repositories/passion.repository.js';
import { SubmissionStatus } from '../../../domain/entities/submission.js';
import {
  PassCompetencesDto,
  PassCompetenceItemDto,
} from '../../dtos/pass-competences.dto.js';

@Injectable()
export class GetPassCompetencesUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: SubmissionRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
    @Inject(PASSION_REPOSITORY)
    private readonly passionRepository: PassionRepository,
  ) {}

  async execute(userId: string): Promise<PassCompetencesDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    const submissions = await this.submissionRepository.findByUser(userId);
    const validated = submissions.filter(
      (s) => s.status === SubmissionStatus.VALIDATED,
    );

    const items: PassCompetenceItemDto[] = [];
    for (const submission of validated) {
      const challenge = await this.challengeRepository.findById(
        submission.challengeId,
      );
      if (!challenge) continue;
      const [skill, passions] = await Promise.all([
        this.skillRepository.findById(challenge.skillId),
        this.passionRepository.findByIds([challenge.passionId]),
      ]);
      const passion = passions[0];
      if (!skill || !passion || !submission.validatedAt) continue;

      items.push({
        challengeTitle: challenge.title,
        skillLabel: skill.label,
        subject: skill.subject,
        passionLabel: passion.label,
        validatedAt: submission.validatedAt,
      });
    }

    return { firstName: user.firstName, totalXp: user.xpPoints, items };
  }
}
