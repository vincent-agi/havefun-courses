import { UserRepository } from '../../../domain/repositories/user.repository';
import { BadgeStatus } from '../../../domain/entities/badge';

export class GetBadgesUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Promise<BadgeStatus[]> {
    return this.userRepository.getBadges();
  }
}
