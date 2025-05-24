import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../features/auth/types';

export const decodeTokenRole = (token: string | null): string | undefined => {
  if (!token) {
    return undefined;
  }
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || undefined;
  } catch (error) {
    sessionStorage.removeItem('authToken');
    return undefined;
  }
};
