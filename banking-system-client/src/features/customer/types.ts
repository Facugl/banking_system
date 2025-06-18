import { AppError } from '../../types';
import { Role } from '../../utils/constants';

export interface Profile {
  id: number;
  username: string;
  name: string;
  role: Role;
  authorities: string[];
}

export interface UseProfileOptions {
  showErrorToast?: boolean;
}

export interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  error: AppError | null;
}

export interface CustomerState {
  profile: Profile | null;
  isLoading: boolean;
  error: AppError | null;
}
