import axiosInstance from '../../../services/axiosInstance';
import type {
  Account,
  AccountCreateRequest,
  AccountUpdateRequest,
  AccountStatusRequest,
  AccountOperationRequest,
  TransferRequest,
} from '../types';
import type { TransactionResponse } from '../../transactions/types';

export const createAccountApi = async (
  data: AccountCreateRequest,
): Promise<Account> => {
  const { data: response } = await axiosInstance.post<Account>(
    '/accounts',
    data,
  );
  return response;
};

export const getAccountApi = async (
  accountNumber: string,
): Promise<Account> => {
  const { data } = await axiosInstance.get<Account>(
    `/accounts/${accountNumber}`,
  );
  return data;
};

export const getAccountsApi = async (): Promise<Account[]> => {
  const { data } = await axiosInstance.get<Account[]>('/accounts');
  return data;
};

export const updateAccountApi = async (
  accountNumber: string,
  accountData: AccountUpdateRequest,
): Promise<Account> => {
  const { data } = await axiosInstance.put<Account>(
    `/accounts/${accountNumber}`,
    accountData,
  );
  return data;
};

export const changeAccountStatusApi = async (
  accountNumber: string,
  statusData: AccountStatusRequest,
): Promise<Account> => {
  const { data } = await axiosInstance.patch<Account>(
    `/accounts/${accountNumber}/change-status`,
    statusData,
  );
  return data;
};

export const deleteAccountApi = async (
  accountNumber: string,
): Promise<void> => {
  await axiosInstance.delete(`/accounts/${accountNumber}`);
};

export const depositApi = async (
  accountNumber: string,
  operationData: AccountOperationRequest,
): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.post<TransactionResponse>(
    `/accounts/${accountNumber}/deposit`,
    operationData,
  );
  return data;
};

export const withdrawApi = async (
  accountNumber: string,
  operationData: AccountOperationRequest,
): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.post<TransactionResponse>(
    `/accounts/${accountNumber}/withdraw`,
    operationData,
  );
  return data;
};

export const transferApi = async (
  sourceAccountNumber: string,
  transferData: TransferRequest,
): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.post<TransactionResponse>(
    `/accounts/${sourceAccountNumber}/transfer`,
    transferData,
  );
  return data;
};

export const getAccountBalanceApi = async (
  accountNumber: string,
): Promise<number> => {
  const { data } = await axiosInstance.get<number>(
    `/accounts/${accountNumber}/balance`,
  );
  return data;
};
