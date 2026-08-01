import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../services/authService";
import type { User, LoginPayload, RegisterPayload } from "../types/auth.types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, check if we already have a valid session (via refresh cookie)
  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const { user: profile } = await authService.getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    const data = await authService.login(payload);
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const data = await authService.register(payload);
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth state anywhere in the app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
