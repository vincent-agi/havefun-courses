import { HttpAuthRepository } from '../infrastructure/http/http-auth.repository';
import { HttpUserRepository } from '../infrastructure/http/http-user.repository';
import { HttpPassionRepository } from '../infrastructure/http/http-passion.repository';
import { HttpChallengeRepository } from '../infrastructure/http/http-challenge.repository';
import { RegisterUseCase } from './use-cases/auth/register.use-case';
import { LoginUseCase } from './use-cases/auth/login.use-case';
import { GetCurrentUserUseCase } from './use-cases/users/get-current-user.use-case';
import { UpdateOnboardingUseCase } from './use-cases/users/update-onboarding.use-case';
import { ListPassionsUseCase } from './use-cases/passions/list-passions.use-case';
import { ListChallengesUseCase } from './use-cases/challenges/list-challenges.use-case';

const authRepository = new HttpAuthRepository();
const userRepository = new HttpUserRepository();
const passionRepository = new HttpPassionRepository();
const challengeRepository = new HttpChallengeRepository();

export const container = {
  registerUseCase: new RegisterUseCase(authRepository),
  loginUseCase: new LoginUseCase(authRepository),
  getCurrentUserUseCase: new GetCurrentUserUseCase(userRepository),
  updateOnboardingUseCase: new UpdateOnboardingUseCase(userRepository),
  listPassionsUseCase: new ListPassionsUseCase(passionRepository),
  listChallengesUseCase: new ListChallengesUseCase(challengeRepository),
};
