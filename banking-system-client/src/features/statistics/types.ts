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

export interface StatisticsError {
  frontendMessage: string;
  backendMessage: string;
  status: number;
}

export interface StatisticsState {
  statistics: StatisticsResponse | null;
  isLoading: boolean;
  error: StatisticsError | null;
}

export interface StatisticsCardsProps {
  totalAccounts: number;
  totalTransactions: number;
  totalBalance: number;
}

export interface TransactionsByTypeChartProps {
  transactionsByType: TransactionsByType;
}

export interface AccountGrowthChartProps {
  data: AccountGrowth[];
}
