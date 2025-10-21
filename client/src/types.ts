export interface User {
    name: string;
    email: string;
    role: "freelancer" | "client" | "admin";
}

export interface UserState {
  user: User | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}