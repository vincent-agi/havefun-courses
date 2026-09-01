import { NewUser, User } from '../entities/user.js';
import { SchoolLevel } from '../entities/school-level.js';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: NewUser): Promise<User>;
  updateOnboarding(
    id: string,
    data: { schoolLevel: SchoolLevel; passionIds: string[] },
  ): Promise<User>;
}
