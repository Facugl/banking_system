import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTransaction } from '../thunks';
import { ToastIds } from '../../../utils/constants';
import { Transaction } from '../types';
import { showError } from '../../../utils/toast';
import { clearTransactionError } from '../transactionSlice';

export const useTransactionByNumber = (transactionNumber: string | null) => {
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const { transactions, isLoading, error } = useAppSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    if (!transactionNumber) return;

    dispatch(clearTransactionError());

    const cached = transactions.find(
      (tx) => tx.transactionNumber === transactionNumber,
    );
    if (cached) {
      setTransaction(cached);
      return;
    }

    dispatch(getTransaction(transactionNumber)).then((action) => {
      if (getTransaction.fulfilled.match(action)) {
        setTransaction(action.payload);
      } else {
        setTransaction(null);
      }
    });
  }, [dispatch, transactionNumber, transactions]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, { toastId: ToastIds.TRANSACTION_ERROR });
    }
  }, [error]);

  return {
    transaction,
    isLoading,
    hasError: Boolean(error),
  };
};
