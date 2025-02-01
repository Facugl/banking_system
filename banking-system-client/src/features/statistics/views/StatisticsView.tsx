import React from 'react';
import { Box, CircularProgress, Typography, Grid2 } from '@mui/material';
import { useStatistics } from '../hooks/useStatistics';
import {
  StatisticsCards,
  TransactionsByTypeChart,
  AccountGrowthChart,
} from '../components';
import transformTransactionsByType from '../../../utils/transformTransactionsByType';

const StatisticsView: React.FC = () => {
  const { isLoading, statistics, error } = useStatistics();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant='h6' color='error'>
        {error}
      </Typography>
    );
  }

  if (!statistics) {
    return (
      <Typography variant='h6' color='error'>
        No statistics available.
      </Typography>
    );
  }

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12 }}>
        <StatisticsCards {...statistics} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography variant='h6' gutterBottom>
          Accounts Growth
        </Typography>
        <AccountGrowthChart data={statistics.accountGrowth} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography variant='h6' gutterBottom>
          Transactions by Type
        </Typography>
        <TransactionsByTypeChart
          transactionsByType={transformTransactionsByType(
            statistics.transactionsByType,
          )}
        />
      </Grid2>
    </Grid2>
  );
};

export default StatisticsView;
