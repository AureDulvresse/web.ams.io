export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  phone?: string;
  address?: string;
  profile_photo?: string;
  is_email_verified: boolean;
  notification_preferences: Record<string, boolean>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  password2: string;
  role: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface AuthContextType {
  user: User | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ user: User; access: string; refresh: string }>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: Error | null;
  registerError: Error | null;
  profile?: User;
}
