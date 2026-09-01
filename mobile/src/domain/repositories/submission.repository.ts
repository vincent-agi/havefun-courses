import { CreateSubmissionInput, Submission } from '../entities/submission';

export interface SubmissionRepository {
  create(
    challengeId: string,
    input: CreateSubmissionInput,
  ): Promise<Submission>;
  listMine(): Promise<Submission[]>;
}
