import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUserUseCase } from './login-user.use-case.js';
import { type UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';

function makeUserRepositoryStub(user: User | null): UserRepository {
  return {
    findById: async () => null,
    findByEmail: async () => user,
    create: async () => {
      throw new Error('not implemented');
    },
    updateOnboarding: async () => {
      throw new Error('not implemented');
    },
    addXp: async () => {
      throw new Error('not implemented');
    },
  };
}

describe('LoginUserUseCase', () => {
  it("retourne l'utilisateur si le mot de passe correspond", async () => {
    const passwordHash = await bcrypt.hash('motdepasse123', 10);
    const user: User = {
      id: '1',
      email: 'eleve@example.com',
      passwordHash,
      firstName: 'Alex',
      schoolLevel: null,
      passionIds: [],
      xpPoints: 0,
      createdAt: new Date(),
    };
    const useCase = new LoginUserUseCase(makeUserRepositoryStub(user));

    const result = await useCase.execute({
      email: 'eleve@example.com',
      password: 'motdepasse123',
    });
    expect(result.id).toBe('1');
  });

  it("rejette si l'utilisateur n'existe pas", async () => {
    const useCase = new LoginUserUseCase(makeUserRepositoryStub(null));

    await expect(
      useCase.execute({
        email: 'inconnu@example.com',
        password: 'motdepasse123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejette si le mot de passe est incorrect', async () => {
    const passwordHash = await bcrypt.hash('motdepasse123', 10);
    const user: User = {
      id: '1',
      email: 'eleve@example.com',
      passwordHash,
      firstName: 'Alex',
      schoolLevel: null,
      passionIds: [],
      xpPoints: 0,
      createdAt: new Date(),
    };
    const useCase = new LoginUserUseCase(makeUserRepositoryStub(user));

    await expect(
      useCase.execute({
        email: 'eleve@example.com',
        password: 'mauvais-mot-de-passe',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
