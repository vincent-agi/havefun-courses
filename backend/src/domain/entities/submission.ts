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
  submittedAt: Date;
  validatedAt: Date | null;
}
