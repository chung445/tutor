import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types/index";
import { AuthService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = AuthService.loadUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await AuthService.login(email, password);
      AuthService.saveUser(user);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    AuthService.clearUser();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    AuthService.saveUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export types for backward compatibility
export type { User, AuthContextType };
export type { UserRole } from "../types/index";
