import { Badge } from './badge';

export enum SubmissionStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

export interface Submission {
  id: string;
  challengeId: string;
  status: SubmissionStatus;
  mediaUrl: string | null;
  measurements: Record<string, number> | null;
  result: number | null;
  submittedAt: string;
  xpAwarded?: number;
  totalXp?: number;
  badgesAwarded?: Badge[];
}

export interface CreateSubmissionInput {
  mediaUrl?: string;
  measurements?: Record<string, number>;
  result?: number;
  sensorData?: Record<string, unknown>;
}
