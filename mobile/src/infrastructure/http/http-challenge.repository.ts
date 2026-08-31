import { httpClient } from './http-client';
import { ChallengeRepository } from '../../domain/repositories/challenge.repository';
import { Challenge, ChallengeFilters } from '../../domain/entities/challenge';

function toQueryString(filters: ChallengeFilters): string {
  const params = new URLSearchParams();
  if (filters.schoolLevel) params.set('schoolLevel', filters.schoolLevel);
  if (filters.passionId) params.set('passionId', filters.passionId);
  if (filters.maxDurationMinutes)
    params.set('maxDurationMinutes', String(filters.maxDurationMinutes));
  const query = params.toString();
  return query ? `?${query}` : '';
}

export class HttpChallengeRepository implements ChallengeRepository {
  async list(filters: ChallengeFilters): Promise<Challenge[]> {
    return httpClient.get<Challenge[]>(`/challenges${toQueryString(filters)}`);
  }
}
