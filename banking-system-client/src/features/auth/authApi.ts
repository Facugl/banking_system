import axiosInstance from '../../services/axiosInstance';
import { ApiEndpoints } from '../../utils/constants';
import { AuthResponse, AuthenticateRequest, RegisterRequest } from './types';

export const authenticateApi = async (credentials: AuthenticateRequest) => {
  const { data } = await axiosInstance.post<AuthResponse>(
    ApiEndpoints.AUTHENTICATE,
    credentials,
  );

  return data;
};

export const registerApi = async (customer: RegisterRequest) => {
  const { data } = await axiosInstance.post<AuthResponse>(
    ApiEndpoints.REGISTER,
    customer,
  );

  return data;
};

export const logoutApi = async () => {
  const { data } = await axiosInstance.post<{ message: string }>(
    ApiEndpoints.LOGOUT,
  );

  return data;
};
