import { httpClient } from './http-client';
import {
  AuthRepository,
  AuthSession,
  LoginInput,
  RegisterInput,
} from '../../domain/repositories/auth.repository';

interface AuthResponse {
  accessToken: string;
  user: AuthSession['user'];
}

export class HttpAuthRepository implements AuthRepository {
  async register(input: RegisterInput): Promise<AuthSession> {
    return httpClient.post<AuthResponse>('/auth/register', input, false);
  }

  async login(input: LoginInput): Promise<AuthSession> {
    return httpClient.post<AuthResponse>('/auth/login', input, false);
  }
}
