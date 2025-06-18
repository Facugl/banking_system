import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { showError } from '../../../utils/toast';
import { UseProfileOptions, UseProfileReturn } from '../types';
import { ToastIds } from '../../../utils/constants';

export const useProfile = ({
  showErrorToast = true,
}: UseProfileOptions = {}): UseProfileReturn => {
  const { profile, isLoading, error } = useAppSelector(
    (state) => state.customer,
  );
  const hasShownErrorRef = useRef(false);

  useEffect(() => {
    if (error && showErrorToast && !hasShownErrorRef.current) {
      hasShownErrorRef.current = true;
      showError(error.frontendMessage, {
        toastId: ToastIds.PROFILE_ERROR,
        autoClose: 3000,
      });
    }
  }, [error, showErrorToast]);

  return { profile, isLoading, error };
};
