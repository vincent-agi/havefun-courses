import {
  UserRepository,
  UpdateOnboardingInput,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user';

export class UpdateOnboardingUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(input: UpdateOnboardingInput): Promise<User> {
    return this.userRepository.updateOnboarding(input);
  }
}
