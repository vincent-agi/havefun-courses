import { SubmissionStatus } from '../../domain/entities/submission.js';

export interface SubmissionResponseDto {
  id: string;
  challengeId: string;
  status: SubmissionStatus;
  mediaUrl: string | null;
  measurements: Record<string, number> | null;
  result: number | null;
  submittedAt: Date;
}
