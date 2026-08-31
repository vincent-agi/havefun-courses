import { httpClient } from './http-client';
import { PassionRepository } from '../../domain/repositories/passion.repository';
import { Passion } from '../../domain/entities/passion';

export class HttpPassionRepository implements PassionRepository {
  async list(): Promise<Passion[]> {
    return httpClient.get<Passion[]>('/passions', false);
  }
}
