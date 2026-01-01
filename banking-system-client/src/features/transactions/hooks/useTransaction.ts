import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTransactions } from '../thunks';
import { ToastIds } from '../../../utils/constants';
import { showError } from '../../../utils/toast';

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, isLoading, error } = useAppSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, { toastId: ToastIds.ACCOUNT_ERROR });
    }
  }, [error]);

  const fetchTransactions = () => {
    dispatch(getTransactions());
  };

  return {
    transactions,
    isLoading,
    hasError: Boolean(error),
    fetchTransactions,
  };
};
