import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../features/auth/types';

export const decodeToken = (
  token: string | null,
): { role?: string; username?: string; name?: string; exp?: number } => {
  if (!token) {
    return {};
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    return {
      role: decoded.role || undefined,
      username: decoded.sub || decoded.username || undefined,
      name: decoded.name || decoded.given_name || undefined,
    };
  } catch (error) {
    sessionStorage.removeItem('authToken');

    return {};
  }
};
