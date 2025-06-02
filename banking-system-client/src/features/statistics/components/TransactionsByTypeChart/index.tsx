import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { TransactionsByTypeChartProps } from '../../types';
import { ChartContainer } from './styles';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionsByTypeChart: React.FC<TransactionsByTypeChartProps> = ({
  transactionsByType,
}) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width='100%' height='80%'>
        <PieChart>
          <Pie
            data={transactionsByType}
            dataKey='count'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {transactionsByType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TransactionsByTypeChart;
