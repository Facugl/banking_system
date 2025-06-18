import { AuthenticateRequest, RegisterRequest } from '../features/auth/types';
import { Profile } from '../features/customer/types';
import { Role } from '../utils/constants';

export interface AppError {
  frontendMessage: string;
  backendMessage: string;
  status: number;
}

export interface UseAuthSessionOptions {
  showSuccessToast?: boolean;
}

export interface UseAuthSessionReturn {
  isLoading: boolean;
  isSessionLoading: boolean;
  error: AppError | null;
  role: Role | undefined;
  profile: Profile | null;
  token: string | null;
  loginSuccess: boolean;
  registerSuccess: boolean;
  handleLogin: (credentials: AuthenticateRequest) => void;
  handleRegister: (customer: RegisterRequest) => void;
  handleLogout: () => void;
}
