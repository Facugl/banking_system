import { AccountType } from '../accounts/types';

export type TransactionsByTypeItem = {
  name: string;
  count: number;
};

export type TransactionsByType = TransactionsByTypeItem[];

export interface AccountGrowth {
  date: string;
  totalAccounts: number;
  dailyGrowth: number;
  growthPercentage: number;
  cumulativeTotal: number;
}

export type BalanceByAccountType = {
  [key in AccountType]: number;
};

export interface StatisticsResponse {
  totalAccounts: number;
  totalTransactions: number;
  totalBalance: number;
  transactionsByType: Record<string, number>;
  accountGrowth: AccountGrowth[];
  averageBalanceByAccountType: BalanceByAccountType[];
}

export interface StatisticsState {
  statistics: StatisticsResponse | null;
  isLoading: boolean;
  error: string | null;
}
