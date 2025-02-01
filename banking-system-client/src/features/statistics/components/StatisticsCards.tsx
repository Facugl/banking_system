import { Grid2, Card, CardContent, Typography } from '@mui/material';

interface StatisticsCardsProps {
  totalAccounts: number;
  totalTransactions: number;
  totalBalance: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  totalAccounts = 0,
  totalTransactions = 0,
  totalBalance = 0,
}) => (
  <Grid2 container spacing={3}>
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Total Accounts
          </Typography>
          <Typography variant='h4'>{totalAccounts}</Typography>
        </CardContent>
      </Card>
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Total Transactions
          </Typography>
          <Typography variant='h4'>{totalTransactions}</Typography>
        </CardContent>
      </Card>
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Total Balance
          </Typography>
          <Typography variant='h4'>${totalBalance.toFixed(2)}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  </Grid2>
);

export default StatisticsCards;
