import { useTheme, type Theme } from '@mui/material/styles';
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
import React from 'react';

const RADIAN = Math.PI / 180;

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  value: number;
}

/**
 * Custom label + connector line, offset horizontally away from the
 * vertical centerline. Recharts' default label placement puts a slice's
 * value exactly on the radius line at its midpoint angle, which lands
 * squarely on a vertical connector/boundary line whenever a slice's
 * midpoint is at the top or bottom of the pie (e.g. two equal-sized
 * slices meeting there) - the label then visually merges with that line.
 * Nudging the label (and its elbow) sideways keeps it legible regardless
 * of how the underlying data happens to split.
 */
const renderPieLabel = (theme: Theme) => (props: PieLabelProps) => {
  const { cx, cy, midAngle, outerRadius, value } = props;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const side = cos >= 0 ? 1 : -1;

  const lineStartX = cx + outerRadius * cos;
  const lineStartY = cy + outerRadius * sin;
  const elbowX = cx + (outerRadius + 14) * cos;
  const elbowY = cy + (outerRadius + 14) * sin;
  const labelX = elbowX + side * 14;

  return (
    <g>
      <path
        d={`M${lineStartX},${lineStartY} L${elbowX},${elbowY} L${labelX},${elbowY}`}
        stroke={theme.palette.divider}
        fill='none'
      />
      <text
        x={labelX + side * 4}
        y={elbowY}
        fill={theme.palette.text.primary}
        textAnchor={side > 0 ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {value}
      </text>
    </g>
  );
};

const TransactionsByTypeChart: React.FC<TransactionsByTypeChartProps> = ({
  transactionsByType,
}) => {
  const theme = useTheme();
  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width='100%' height='75%'>
        <PieChart>
          <Pie
            data={transactionsByType}
            dataKey='count'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={90}
            fill={theme.palette.primary.main}
            label={renderPieLabel(theme)}
            labelLine={false}
          >
            {transactionsByType.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.text.primary,
            }}
          />
          <Legend
            wrapperStyle={{
              color: theme.palette.text.secondary,
              paddingTop: 16,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TransactionsByTypeChart;
