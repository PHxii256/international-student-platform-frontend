import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../constants/roles';
import {
  login as loginRequest,
  register as registerRequest,
  me,
  type RegisterPayload,
  type StrapiUser,
} from '../services/auth';

interface JwtPayload {
  exp?: number;
}

interface AuthContextValue {
  user: StrapiUser | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isCollegeMember: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return true;
    }
    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StrapiUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      return;
    }

    const freshUser = await me(token);
    setUser(freshUser);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jwt');

      if (!storedToken || isTokenExpired(storedToken)) {
        clearSession();
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      try {
        const freshUser = await me(storedToken);
        setUser(freshUser);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const auth = await loginRequest(identifier, password);
      localStorage.setItem('jwt', auth.jwt);
      setToken(auth.jwt);
      const freshUser = await me(auth.jwt);
      setUser(freshUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const auth = await registerRequest(payload);
      localStorage.setItem('jwt', auth.jwt);
      setToken(auth.jwt);
      const freshUser = await me(auth.jwt);
      setUser(freshUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      isAdmin: user?.userType === 'admin' || user?.role?.type === 'admin',
      isCollegeMember: user?.role?.type === 'college-member',
      refreshUser,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
