import { AppError } from '../../types';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
}

export interface TransactionResponse {
  id: number;
  transactionNumber: string;
  sourceAccount: string;
  targetAccount: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  comment?: string;
}

export interface Transaction {
  id: number;
  transactionNumber: string;
  sourceAccount: string | null;
  targetAccount: string | null;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  comment?: string;
}

export interface SimpleAccount {
  id: number;
  accountNumber: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  error: AppError | null;
}
