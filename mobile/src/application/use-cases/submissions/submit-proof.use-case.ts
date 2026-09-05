import { MediaRepository } from '../../../domain/repositories/media.repository';
import { SubmissionRepository } from '../../../domain/repositories/submission.repository';
import { Submission } from '../../../domain/entities/submission';

export type SubmitProofInput = {
  challengeId: string;
  measurements?: Record<string, number>;
  result?: number;
  photoUri?: string;
};

export class SubmitProofUseCase {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly submissionRepository: SubmissionRepository,
  ) {}

  async execute(input: SubmitProofInput): Promise<Submission> {
    let mediaUrl: string | undefined;

    if (input.photoUri) {
      const uploaded = await this.mediaRepository.uploadPhoto(input.photoUri);
      mediaUrl = uploaded.mediaUrl;
    }

    return this.submissionRepository.create(input.challengeId, {
      mediaUrl,
      measurements: input.measurements,
      result: input.result,
    });
  }
}
