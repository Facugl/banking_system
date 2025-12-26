import { AppError } from '../../types';

export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends AuthenticateRequest {
  name: string;
  repeatedPassword: string;
}

export interface AuthResponse {
  jwt: string;
}

export interface AuthState {
  token: string;
  isLoading: boolean;
  sessionLoading: boolean;
  sessionReady: boolean,
  loginSuccess: boolean;
  registerSuccess: boolean;
  logoutSuccess: boolean;
  justLoggedIn: boolean;
  error: AppError | null;
}

export interface UseAuthOptions {
  showSuccessToast?: boolean;
}

export interface UseAuthReturn {
  isLoading: boolean;
  error: AppError | null;
  loginSuccess: boolean;
  registerSuccess: boolean;
  handleLogin: (credentials: AuthenticateRequest) => void;
  handleRegister: (customer: RegisterRequest) => void;
  handleLogout: () => void;
}
