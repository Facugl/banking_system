import { Stack } from '@mui/material';
import { StatisticsCardsProps } from '../../types';
import {
  StyledCard,
  StyledCardContent,
  StyledTitle,
  StyledValue,
} from './styles';

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  totalAccounts,
  totalTransactions,
  totalBalance,
}) => {
  return (
    <Stack maxWidth={{lg: '1068px'}}  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <StyledCard>
        <StyledCardContent>
          <StyledTitle variant='subtitle1'>Total Accounts</StyledTitle>
          <StyledValue variant='h4'>{totalAccounts}</StyledValue>
        </StyledCardContent>
      </StyledCard>

      <StyledCard>
        <StyledCardContent>
          <StyledTitle variant='subtitle1'>Total Transactions</StyledTitle>
          <StyledValue variant='h4'>{totalTransactions}</StyledValue>
        </StyledCardContent>
      </StyledCard>

      <StyledCard>
        <StyledCardContent>
          <StyledTitle variant='subtitle1'>Total Balance</StyledTitle>
          <StyledValue variant='h4'>${totalBalance.toFixed(2)}</StyledValue>
        </StyledCardContent>
      </StyledCard>
    </Stack>
  );
};

export default StatisticsCards;
