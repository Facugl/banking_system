import { toast, ToastOptions } from 'react-toastify';

export const showSuccess = (message: string, options: ToastOptions = {}) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showError = (message: string, options: ToastOptions = {}) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};
