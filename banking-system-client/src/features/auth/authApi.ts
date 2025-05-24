import axiosInstance from '../../services/axiosInstance';
import {
  AuthenticateResponse,
  AuthenticateRequest,
  RegisterRequest,
  RegisterResponse,
} from './types';

export const authenticateApi = async (credentials: AuthenticateRequest) => {
  const { data } = await axiosInstance.post<AuthenticateResponse>(
    '/auth/authenticate',
    credentials,
  );

  return data;
};

export const registerApi = async (customer: RegisterRequest) => {
  const { data } = await axiosInstance.post<RegisterResponse>(
    '/users',
    customer,
  );

  return data;
};

export const logoutApi = async () => {
  const { data } = await axiosInstance.post<{ message: string }>(
    '/auth/logout',
  );

  return data;
};
