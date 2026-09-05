import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { ChallengeDetailDto } from '../../dtos/challenge-detail.dto.js';

@Injectable()
export class GetChallengeDetailUseCase {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(PASSION_REPOSITORY)
    private readonly passionRepository: PassionRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
  ) {}

  async execute(challengeId: string): Promise<ChallengeDetailDto> {
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Défi introuvable.');
    }

    const [passions, skill] = await Promise.all([
      this.passionRepository.findByIds([challenge.passionId]),
      this.skillRepository.findById(challenge.skillId),
    ]);
    const passion = passions[0];
    if (!passion || !skill) {
      throw new NotFoundException('Défi introuvable.');
    }

    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      schoolLevel: challenge.schoolLevel,
      durationMinutes: challenge.durationMinutes,
      passion,
      skill,
      narrativeIntro: challenge.narrativeIntro,
      theoryExplanation: challenge.theoryExplanation,
      calculatorSchema: challenge.calculatorSchema,
      notionKey: challenge.notionKey,
      guidedExperiment: challenge.guidedExperiment,
      autonomousChallenge: challenge.autonomousChallenge,
    };
  }
}
