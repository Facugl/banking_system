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
          <CartesianGrid strokeDasharray='3 3' stroke={theme.palette.divider} />
          <XAxis
            dataKey='date'
            angle={-45}
            textAnchor='end'
            tick={{ fill: theme.palette.text.secondary }}
            stroke={theme.palette.divider}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary }}
            stroke={theme.palette.divider}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.text.primary,
            }}
            labelStyle={{ color: theme.palette.text.primary }}
          />
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
