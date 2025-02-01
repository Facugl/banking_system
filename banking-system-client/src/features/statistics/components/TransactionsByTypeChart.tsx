import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TransactionsByType } from '../types';

type TransactionsByTypeChartProps = {
  transactionsByType: TransactionsByType;
};

const TransactionsByTypeChart: React.FC<TransactionsByTypeChartProps> = ({
  transactionsByType,
}) => (
  <ResponsiveContainer width='100%' height={300}>
    <BarChart data={transactionsByType}>
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='count' fill='#8884d8' />
    </BarChart>
  </ResponsiveContainer>
);

export default TransactionsByTypeChart;
