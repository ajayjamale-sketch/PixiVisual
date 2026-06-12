import { useState, useEffect } from "react";
import type { User } from "@/types";
import { getCurrentUser, setCurrentUser, clearCurrentUser, loginAsDemo } from "@/lib/auth";
import type { UserRole } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    // Mock login - in production this would call an API
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role: "content-creator",
      plan: "free",
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(mockUser);
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  const loginDemo = async (role: UserRole): Promise<User> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const u = loginAsDemo(role);
    setUser(u);
    setIsLoading(false);
    return u;
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  const signup = async (name: string, email: string, _password: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "content-creator",
      plan: "free",
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(mockUser);
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  return { user, isLoading, login, loginDemo, logout, signup, isAuthenticated: !!user };
}
