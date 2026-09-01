import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type ChallengeRepository,
  CHALLENGE_REPOSITORY,
} from '../../../domain/repositories/challenge.repository.js';
import {
  type SubmissionRepository,
  SUBMISSION_REPOSITORY,
} from '../../../domain/repositories/submission.repository.js';
import { SubmissionStatus } from '../../../domain/entities/submission.js';
import { CreateSubmissionDto } from '../../dtos/create-submission.dto.js';
import { SubmissionResponseDto } from '../../dtos/submission-response.dto.js';
import { ValidateSubmissionUseCase } from './validate-submission.use-case.js';

@Injectable()
export class CreateSubmissionUseCase {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: SubmissionRepository,
    private readonly validateSubmissionUseCase: ValidateSubmissionUseCase,
  ) {}

  async execute(
    userId: string,
    challengeId: string,
    dto: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Défi introuvable.');
    }

    const submission = await this.submissionRepository.create({
      userId,
      challengeId,
      mediaUrl: dto.mediaUrl ?? null,
      measurements: dto.measurements ?? null,
      result: dto.result ?? null,
      sensorData: dto.sensorData ?? null,
    });

    // MVP : aucune revue humaine n'existe encore, la soumission est auto-validée
    // pour déclencher immédiatement XP et badges. À remplacer par un flux de
    // validation dédié quand un rôle de relecture sera introduit.
    const validation = await this.validateSubmissionUseCase.execute(
      submission,
      challenge,
    );

    return {
      id: submission.id,
      challengeId: submission.challengeId,
      status: SubmissionStatus.VALIDATED,
      mediaUrl: submission.mediaUrl,
      measurements: submission.measurements,
      result: submission.result,
      submittedAt: submission.submittedAt,
      xpAwarded: validation.xpAwarded,
      totalXp: validation.totalXp,
      badgesAwarded: validation.badgesAwarded,
    };
  }
}
