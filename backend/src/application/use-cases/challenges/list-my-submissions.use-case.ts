import { Inject, Injectable } from '@nestjs/common';
import {
  type SubmissionRepository,
  SUBMISSION_REPOSITORY,
} from '../../../domain/repositories/submission.repository.js';
import { SubmissionResponseDto } from '../../dtos/submission-response.dto.js';

@Injectable()
export class ListMySubmissionsUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: SubmissionRepository,
  ) {}

  async execute(userId: string): Promise<SubmissionResponseDto[]> {
    const submissions = await this.submissionRepository.findByUser(userId);
    return submissions.map((submission) => ({
      id: submission.id,
      challengeId: submission.challengeId,
      status: submission.status,
      mediaUrl: submission.mediaUrl,
      measurements: submission.measurements,
      result: submission.result,
      submittedAt: submission.submittedAt,
    }));
  }
}
