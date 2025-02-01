import { TransactionsByType } from '../features/statistics/types';

const transformTransactionsByType = (
  data: Record<string, number>,
): TransactionsByType => {
  return Object.entries(data).map(([name, count]) => ({
    name,
    count,
  }));
};

export default transformTransactionsByType;
