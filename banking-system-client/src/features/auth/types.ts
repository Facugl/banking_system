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
}

export interface RegisterResponse {
  id: number;
  username: string;
  name: string;
  role: string;
  token: string;
}

export interface DecodedToken {
  role: string;
  exp: number;
}

export interface AuthState {
  id: number;
  username: string;
  name: string;
  role: string;
  token: string;
  isLoading: boolean;
  success: boolean;
  error: string | null;
}
