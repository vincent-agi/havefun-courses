import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { container } from '../../application/container';
import { sessionStorage } from '../../infrastructure/storage/session-storage';
import { User } from '../../domain/entities/user';
import {
  RegisterInput,
  LoginInput,
} from '../../domain/repositories/auth.repository';
import { UpdateOnboardingInput } from '../../domain/repositories/user.repository';

type SessionState = {
  status: 'loading' | 'signed-out' | 'signed-in';
  user: User | null;
};

type SessionContextValue = SessionState & {
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  updateOnboarding: (input: UpdateOnboardingInput) => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>({
    status: 'loading',
    user: null,
  });

  const restoreSession = useCallback(async () => {
    try {
      const user = await container.getCurrentUserUseCase.execute();
      setState({ status: 'signed-in', user });
    } catch {
      await sessionStorage.clear();
      setState({ status: 'signed-out', user: null });
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const register = useCallback(async (input: RegisterInput) => {
    const session = await container.registerUseCase.execute(input);
    setState({ status: 'signed-in', user: session.user });
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const session = await container.loginUseCase.execute(input);
    setState({ status: 'signed-in', user: session.user });
  }, []);

  const logout = useCallback(async () => {
    await sessionStorage.clear();
    setState({ status: 'signed-out', user: null });
  }, []);

  const updateOnboarding = useCallback(async (input: UpdateOnboardingInput) => {
    const user = await container.updateOnboardingUseCase.execute(input);
    setState({ status: 'signed-in', user });
  }, []);

  const value = useMemo(
    () => ({ ...state, register, login, logout, updateOnboarding }),
    [state, register, login, logout, updateOnboarding],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession doit être utilisé dans un SessionProvider.');
  }
  return context;
}
