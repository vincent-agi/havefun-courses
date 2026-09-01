import { HttpAuthRepository } from '../infrastructure/http/http-auth.repository';
import { HttpUserRepository } from '../infrastructure/http/http-user.repository';
import { HttpPassionRepository } from '../infrastructure/http/http-passion.repository';
import { HttpChallengeRepository } from '../infrastructure/http/http-challenge.repository';
import { HttpSubmissionRepository } from '../infrastructure/http/http-submission.repository';
import { HttpMediaRepository } from '../infrastructure/http/http-media.repository';
import { HttpPassExportRepository } from '../infrastructure/http/http-pass-export.repository';
import { RegisterUseCase } from './use-cases/auth/register.use-case';
import { LoginUseCase } from './use-cases/auth/login.use-case';
import { GetCurrentUserUseCase } from './use-cases/users/get-current-user.use-case';
import { UpdateOnboardingUseCase } from './use-cases/users/update-onboarding.use-case';
import { GetBadgesUseCase } from './use-cases/users/get-badges.use-case';
import { GetPassCompetencesUseCase } from './use-cases/users/get-pass-competences.use-case';
import { DownloadPassCompetencesPdfUseCase } from './use-cases/users/download-pass-competences-pdf.use-case';
import { ListPassionsUseCase } from './use-cases/passions/list-passions.use-case';
import { ListChallengesUseCase } from './use-cases/challenges/list-challenges.use-case';
import { GetChallengeDetailUseCase } from './use-cases/challenges/get-challenge-detail.use-case';
import { SubmitProofUseCase } from './use-cases/submissions/submit-proof.use-case';

const authRepository = new HttpAuthRepository();
const userRepository = new HttpUserRepository();
const passionRepository = new HttpPassionRepository();
const challengeRepository = new HttpChallengeRepository();
const submissionRepository = new HttpSubmissionRepository();
const mediaRepository = new HttpMediaRepository();
const passExportRepository = new HttpPassExportRepository();

export const container = {
  registerUseCase: new RegisterUseCase(authRepository),
  loginUseCase: new LoginUseCase(authRepository),
  getCurrentUserUseCase: new GetCurrentUserUseCase(userRepository),
  updateOnboardingUseCase: new UpdateOnboardingUseCase(userRepository),
  getBadgesUseCase: new GetBadgesUseCase(userRepository),
  getPassCompetencesUseCase: new GetPassCompetencesUseCase(userRepository),
  downloadPassCompetencesPdfUseCase: new DownloadPassCompetencesPdfUseCase(
    passExportRepository,
  ),
  listPassionsUseCase: new ListPassionsUseCase(passionRepository),
  listChallengesUseCase: new ListChallengesUseCase(challengeRepository),
  getChallengeDetailUseCase: new GetChallengeDetailUseCase(challengeRepository),
  submitProofUseCase: new SubmitProofUseCase(
    mediaRepository,
    submissionRepository,
  ),
};
