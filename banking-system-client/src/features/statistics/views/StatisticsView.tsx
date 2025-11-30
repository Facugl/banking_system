import React from 'react';
import { CircularProgress } from '@mui/material';
import { useStatistics } from '../hooks/useStatistics';
import {
  StatisticsCards,
  TransactionsByTypeChart,
  AccountGrowthChart,
} from '../components';
import transformTransactionsByType from '../../../utils/transformTransactionsByType';
import { useAppDispatch } from '../../../store/hooks';
import { getStatistics } from '../thunks/getStatistics';
import { CenteredBox, ErrorBox, RetryButton, SectionTitle } from './styles';
import { Grid2 } from '@mui/material';
import { Navigate } from 'react-router-dom';

const StatisticsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, statistics, error } = useStatistics();

  if (isLoading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  if (error) {
    if (error.status === 403) {
      return <Navigate to='/unauthorized' replace />;
    }

    return (
      <ErrorBox>
        <SectionTitle variant='h6' color='error' gutterBottom>
          {error.frontendMessage}
        </SectionTitle>
        <RetryButton onClick={() => dispatch(getStatistics())}>
          Retry
        </RetryButton>
      </ErrorBox>
    );
  }

  if (!statistics) {
    return (
      <SectionTitle variant='h6' color='error'>
        No statistics available.
      </SectionTitle>
    );
  }

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12}}>
        <StatisticsCards {...statistics} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <SectionTitle variant='h6'>Accounts Growth</SectionTitle>
        <AccountGrowthChart data={statistics.accountGrowth} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <SectionTitle variant='h6'>Transactions by Type</SectionTitle>
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
