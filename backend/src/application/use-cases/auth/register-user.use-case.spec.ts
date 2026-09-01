import { ConflictException } from '@nestjs/common';
import { RegisterUserUseCase } from './register-user.use-case.js';
import { type UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.js';

function makeUserRepositoryStub(
  existingUser: User | null = null,
): UserRepository {
  const created: User[] = [];
  return {
    findById: async () => null,
    findByEmail: async () => existingUser,
    create: async (input) => {
      const user: User = {
        id: 'new-id',
        email: input.email,
        passwordHash: input.passwordHash,
        firstName: input.firstName,
        schoolLevel: null,
        passionIds: [],
        xpPoints: 0,
        createdAt: new Date(),
      };
      created.push(user);
      return user;
    },
    updateOnboarding: async () => {
      throw new Error('not implemented');
    },
    addXp: async () => {
      throw new Error('not implemented');
    },
  };
}

describe('RegisterUserUseCase', () => {
  it('crée un utilisateur avec un mot de passe haché', async () => {
    const useCase = new RegisterUserUseCase(makeUserRepositoryStub());

    const user = await useCase.execute({
      email: 'eleve@example.com',
      password: 'motdepasse123',
      firstName: 'Alex',
    });

    expect(user.email).toBe('eleve@example.com');
    expect(user.passwordHash).not.toBe('motdepasse123');
    expect(user.passwordHash.length).toBeGreaterThan(0);
  });

  it("refuse la création si l'email est déjà utilisé", async () => {
    const existing: User = {
      id: 'existing',
      email: 'eleve@example.com',
      passwordHash: 'hash',
      firstName: 'Alex',
      schoolLevel: null,
      passionIds: [],
      xpPoints: 0,
      createdAt: new Date(),
    };
    const useCase = new RegisterUserUseCase(makeUserRepositoryStub(existing));

    await expect(
      useCase.execute({
        email: 'eleve@example.com',
        password: 'motdepasse123',
        firstName: 'Alex',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
