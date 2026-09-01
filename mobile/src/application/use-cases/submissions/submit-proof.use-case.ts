import { MediaRepository } from '../../../domain/repositories/media.repository';
import { SubmissionRepository } from '../../../domain/repositories/submission.repository';
import { Submission } from '../../../domain/entities/submission';

export type SubmitProofInput = {
  challengeId: string;
  measurements?: Record<string, number>;
  result?: number;
  photoUri?: string;
};

const PHOTO_CONTENT_TYPE = 'image/jpeg';

export class SubmitProofUseCase {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly submissionRepository: SubmissionRepository,
  ) {}

  async execute(input: SubmitProofInput): Promise<Submission> {
    let mediaUrl: string | undefined;

    if (input.photoUri) {
      const { uploadUrl, mediaUrl: resolvedMediaUrl } =
        await this.mediaRepository.requestUploadUrl(PHOTO_CONTENT_TYPE);
      await this.mediaRepository.uploadFile(
        uploadUrl,
        input.photoUri,
        PHOTO_CONTENT_TYPE,
      );
      mediaUrl = resolvedMediaUrl;
    }

    return this.submissionRepository.create(input.challengeId, {
      mediaUrl,
      measurements: input.measurements,
      result: input.result,
    });
  }
}
