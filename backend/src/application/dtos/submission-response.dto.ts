import { SubmissionStatus } from '../../domain/entities/submission.js';
import { Badge } from '../../domain/entities/badge.js';

export interface SubmissionResponseDto {
  id: string;
  challengeId: string;
  status: SubmissionStatus;
  mediaUrl: string | null;
  measurements: Record<string, number> | null;
  result: number | null;
  submittedAt: Date;
  xpAwarded?: number;
  totalXp?: number;
  badgesAwarded?: Badge[];
}
