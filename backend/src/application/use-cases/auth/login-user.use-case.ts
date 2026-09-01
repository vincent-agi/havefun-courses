import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';
import { LoginDto } from '../../dtos/login.dto.js';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: LoginDto): Promise<User> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    return user;
  }
}
