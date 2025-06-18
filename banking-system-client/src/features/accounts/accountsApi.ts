import axiosInstance from '../../services/axiosInstance';
import type {
  Account,
  AccountCreateRequest,
  AccountUpdateRequest,
  AccountStatusRequest,
  AccountOperationRequest,
  TransferRequest,
} from './types';
import type { TransactionResponse } from '../transactions/types';
import { ApiEndpoints } from '../../utils/constants';
import { buildUrl } from '../../utils/buildUrlUtils';

export const createAccountApi = async (account: AccountCreateRequest) => {
  const { data } = await axiosInstance.post<Account>(
    ApiEndpoints.ACCOUNTS,
    account,
  );

  return data;
};

export const getAccountApi = async (accountNumber: string) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_BY_NUMBER, { accountNumber });
  const { data } = await axiosInstance.get<Account>(url);

  return data;
};

export const getAccountsApi = async () => {
  const { data } = await axiosInstance.get<Account[]>(ApiEndpoints.ACCOUNTS);

  return data;
};

export const updateAccountApi = async (
  accountNumber: string,
  account: AccountUpdateRequest,
) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_BY_NUMBER, { accountNumber });
  const { data } = await axiosInstance.put<Account>(url, account);

  return data;
};

export const changeAccountStatusApi = async (
  accountNumber: string,
  status: AccountStatusRequest,
) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_STATUS, { accountNumber });
  const { data } = await axiosInstance.patch<Account>(url, status);

  return data;
};

export const deleteAccountApi = async (accountNumber: string) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_BY_NUMBER, { accountNumber });

  await axiosInstance.delete(url);
};

export const depositApi = async (
  accountNumber: string,
  operationData: AccountOperationRequest,
) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_DEPOSIT, { accountNumber });
  const { data } = await axiosInstance.post<TransactionResponse>(
    url,
    operationData,
  );

  return data;
};

export const withdrawApi = async (
  accountNumber: string,
  operationData: AccountOperationRequest,
) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_WITHDRAW, { accountNumber });
  const { data } = await axiosInstance.post<TransactionResponse>(
    url,
    operationData,
  );

  return data;
};

export const transferApi = async (
  sourceAccountNumber: string,
  transfer: TransferRequest,
) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_TRANSFER, {
    accountNumber: sourceAccountNumber,
  });
  const { data } = await axiosInstance.post<TransactionResponse>(url, transfer);

  return data;
};

export const getAccountBalanceApi = async (accountNumber: string) => {
  const url = buildUrl(ApiEndpoints.ACCOUNT_BALANCE, { accountNumber });
  const { data } = await axiosInstance.get<number>(url);

  return data;
};
