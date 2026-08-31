import { Inject, Injectable } from '@nestjs/common';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';
import { UpdateOnboardingDto } from '../../dtos/update-onboarding.dto.js';

@Injectable()
export class UpdateOnboardingUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, dto: UpdateOnboardingDto): Promise<User> {
    return this.userRepository.updateOnboarding(userId, {
      schoolLevel: dto.schoolLevel,
      passionIds: dto.passionIds,
    });
  }
}
