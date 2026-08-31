import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user';

export class GetCurrentUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Promise<User> {
    return this.userRepository.getCurrentUser();
  }
}
