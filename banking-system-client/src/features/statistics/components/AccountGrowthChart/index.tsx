import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AccountGrowthChartProps } from '../../types';
import { ChartContainer } from './styles';
import { useTheme } from '@mui/material';

const AccountGrowthChart: React.FC<AccountGrowthChartProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <ChartContainer>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' angle={-45} textAnchor='end' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='cumulativeTotal'
            stroke={theme.palette.primary.main}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AccountGrowthChart;
