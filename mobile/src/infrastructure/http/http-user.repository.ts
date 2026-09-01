import { httpClient } from './http-client';
import {
  UserRepository,
  UpdateOnboardingInput,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { BadgeStatus } from '../../domain/entities/badge';
import { PassCompetences } from '../../domain/entities/pass-competences';

export class HttpUserRepository implements UserRepository {
  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/users/me');
  }

  async updateOnboarding(input: UpdateOnboardingInput): Promise<User> {
    return httpClient.patch<User>('/users/me/onboarding', input);
  }

  async getBadges(): Promise<BadgeStatus[]> {
    return httpClient.get<BadgeStatus[]>('/users/me/badges');
  }

  async getPassCompetences(): Promise<PassCompetences> {
    return httpClient.get<PassCompetences>('/users/me/pass-competences');
  }
}
