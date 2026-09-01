import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }
    return user;
  }
}
