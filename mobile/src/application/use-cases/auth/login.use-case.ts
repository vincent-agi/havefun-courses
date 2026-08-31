import {
  AuthRepository,
  AuthSession,
  LoginInput,
} from '../../../domain/repositories/auth.repository';
import { sessionStorage } from '../../../infrastructure/storage/session-storage';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: LoginInput): Promise<AuthSession> {
    const session = await this.authRepository.login(input);
    await sessionStorage.setAccessToken(session.accessToken);
    return session;
  }
}
