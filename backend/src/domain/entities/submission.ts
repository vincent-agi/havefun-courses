export enum SubmissionStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  status: SubmissionStatus;
  mediaUrl: string | null;
  measurements: Record<string, number> | null;
  result: number | null;
  sensorData: Record<string, unknown> | null;
  submittedAt: Date;
  validatedAt: Date | null;
}

export interface NewSubmission {
  userId: string;
  challengeId: string;
  mediaUrl: string | null;
  measurements: Record<string, number> | null;
  result: number | null;
  sensorData: Record<string, unknown> | null;
}
