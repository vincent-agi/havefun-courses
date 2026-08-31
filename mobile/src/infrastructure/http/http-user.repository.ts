import { httpClient } from './http-client';
import {
  UserRepository,
  UpdateOnboardingInput,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';

export class HttpUserRepository implements UserRepository {
  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/users/me');
  }

  async updateOnboarding(input: UpdateOnboardingInput): Promise<User> {
    return httpClient.patch<User>('/users/me/onboarding', input);
  }
}
