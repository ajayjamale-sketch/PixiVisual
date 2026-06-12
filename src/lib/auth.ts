import type { User, UserRole } from "@/types";
import { DEMO_USERS } from "@/constants";

const USER_KEY = "pixivisual_user";

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function loginAsDemo(role: UserRole): User {
  const demoUser = DEMO_USERS.find((u) => u.role === role);
  if (!demoUser) throw new Error("Invalid role");

  const user: User = {
    id: `demo-${role}-${Date.now()}`,
    name: demoUser.name,
    email: demoUser.email,
    role: demoUser.role,
    avatar: demoUser.avatar,
    plan: role === "enterprise" || role === "admin" ? "enterprise" : role === "agency" ? "business" : "pro",
    createdAt: new Date().toISOString(),
  };

  setCurrentUser(user);
  return user;
}

export function getDashboardPath(role: UserRole): string {
  const demoUser = DEMO_USERS.find((u) => u.role === role);
  return demoUser?.dashboard ?? "/dashboard/creator";
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function logout(): void {
  clearCurrentUser();
}
