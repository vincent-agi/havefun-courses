import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type ChallengeRepository,
  CHALLENGE_REPOSITORY,
} from '../../../domain/repositories/challenge.repository.js';
import {
  type SubmissionRepository,
  SUBMISSION_REPOSITORY,
} from '../../../domain/repositories/submission.repository.js';
import { CreateSubmissionDto } from '../../dtos/create-submission.dto.js';
import { SubmissionResponseDto } from '../../dtos/submission-response.dto.js';

@Injectable()
export class CreateSubmissionUseCase {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: SubmissionRepository,
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

    return {
      id: submission.id,
      challengeId: submission.challengeId,
      status: submission.status,
      mediaUrl: submission.mediaUrl,
      measurements: submission.measurements,
      result: submission.result,
      submittedAt: submission.submittedAt,
    };
  }
}
