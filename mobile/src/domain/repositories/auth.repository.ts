import { User } from '../entities/user';

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthRepository {
  register(input: RegisterInput): Promise<AuthSession>;
  login(input: LoginInput): Promise<AuthSession>;
}
