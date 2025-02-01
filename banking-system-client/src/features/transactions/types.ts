import type { Account } from '../accounts/types';

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
  sourceAccount: Account | null;
  targetAccount: Account | null;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  comment?: string;
}

// Por si necesito un tipo simplificado para Account
export interface SimpleAccount {
  id: number;
  accountNumber: string;
}

export interface TransactionsState {
  transactions: TransactionResponse[];
  isLoading: boolean;
  error: string | null;
}
