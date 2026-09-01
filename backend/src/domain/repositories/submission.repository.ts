import {
  NewSubmission,
  Submission,
  SubmissionStatus,
} from '../entities/submission.js';

export const SUBMISSION_REPOSITORY = Symbol('SUBMISSION_REPOSITORY');

export interface SubmissionRepository {
  create(submission: NewSubmission): Promise<Submission>;
  findById(id: string): Promise<Submission | null>;
  findByUser(userId: string): Promise<Submission[]>;
  updateStatus(id: string, status: SubmissionStatus): Promise<Submission>;
  countByUserAndSkill(
    userId: string,
    skillId: string,
    status: SubmissionStatus,
  ): Promise<number>;
  countByUserAndPassion(
    userId: string,
    passionId: string,
    status: SubmissionStatus,
  ): Promise<number>;
}
