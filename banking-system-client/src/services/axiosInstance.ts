import axios from 'axios';
import { logout } from '../features/auth/thunks';
import { showError } from '../utils/toast';
import { AppDispatch } from '../store/store';
import { clearProfile } from '../features/customer/customerSlice';
import { Messages, HttpStatus, ToastIds } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const configureResponseInterceptor = (store: {
  dispatch: AppDispatch;
}) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === HttpStatus.UNAUTHORIZED) {
        store.dispatch(logout());
        store.dispatch(clearProfile());
        showError(Messages.SESSION_EXPIRED, {
          toastId: ToastIds.SESSION_EXPIRED,
        });
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
