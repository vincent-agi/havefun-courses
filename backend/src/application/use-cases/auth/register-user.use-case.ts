import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';
import { RegisterDto } from '../../dtos/register.dto.js';

const SALT_ROUNDS = 10;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: RegisterDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Un compte existe déjà avec cet email.');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    return this.userRepository.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
    });
  }
}
