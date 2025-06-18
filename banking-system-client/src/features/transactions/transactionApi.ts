import axiosInstance from '../../services/axiosInstance';
import { buildUrl } from '../../utils/buildUrlUtils';
import { ApiEndpoints } from '../../utils/constants';
import { Transaction } from './types';

export const getTransactionApi = async (transactionNumber: string) => {
  const url = buildUrl(ApiEndpoints.TRANSACTION_BY_NUMBER, {
    transactionNumber,
  });
  const { data } = await axiosInstance.get<Transaction>(url);

  return data;
};

export const getTransactionsApi = async () => {
  const { data } = await axiosInstance.get<Transaction[]>(
    ApiEndpoints.TRANSACTIONS,
  );

  return data;
};
