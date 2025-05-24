import axios from 'axios';
import { showError } from '../utils/toast';

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

export const configureResponseInterceptor = (store: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        import('../features/auth/thunks').then(({ logout }) => {
          store.dispatch(logout());

          showError('Session has expired. Please log in again.');
        });
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
