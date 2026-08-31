import {
  AuthRepository,
  AuthSession,
  RegisterInput,
} from '../../../domain/repositories/auth.repository';
import { sessionStorage } from '../../../infrastructure/storage/session-storage';

export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: RegisterInput): Promise<AuthSession> {
    const session = await this.authRepository.register(input);
    await sessionStorage.setAccessToken(session.accessToken);
    return session;
  }
}
