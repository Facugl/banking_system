import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AccountGrowth } from '../types';

type AccountGrowthChartProps = {
  data: AccountGrowth[];
};

const AccountGrowthChart: React.FC<AccountGrowthChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' angle={-45} textAnchor='end' />
        <YAxis />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='cumulativeTotal'
          stroke='#3f51b5'
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AccountGrowthChart;
