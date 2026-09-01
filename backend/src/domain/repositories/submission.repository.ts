import { NewSubmission, Submission } from '../entities/submission.js';

export const SUBMISSION_REPOSITORY = Symbol('SUBMISSION_REPOSITORY');

export interface SubmissionRepository {
  create(submission: NewSubmission): Promise<Submission>;
  findByUser(userId: string): Promise<Submission[]>;
}
