import { httpClient } from './http-client';
import { SubmissionRepository } from '../../domain/repositories/submission.repository';
import {
  CreateSubmissionInput,
  Submission,
} from '../../domain/entities/submission';

export class HttpSubmissionRepository implements SubmissionRepository {
  async create(
    challengeId: string,
    input: CreateSubmissionInput,
  ): Promise<Submission> {
    return httpClient.post<Submission>(
      `/challenges/${challengeId}/submissions`,
      input,
    );
  }

  async listMine(): Promise<Submission[]> {
    return httpClient.get<Submission[]>('/submissions/me');
  }
}
