export interface AuthError {
  frontendMessage: string;
  backendMessage: string;
  status: number;
}

export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends AuthenticateRequest {
  name: string;
  repeatedPassword: string;
}

export interface AuthenticateResponse {
  jwt: string;
  role: string;
  username?: string;
  name?: string;
}

export interface RegisterResponse {
  jwt: string;
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface DecodedToken {
  role?: string;
  sub?: string;
  username?: string;
  given_name?: string;
  name?: string;
  exp?: number;
}

export interface AuthState {
  token: string;
  isLoading: boolean;
  loginSuccess: boolean;
  registerSuccess: boolean;
  logoutSuccess: boolean;
  justLoggedIn: boolean;
  error: AuthError | null;
  id?: number;
  username?: string;
  name?: string;
  role: string | null;
}
