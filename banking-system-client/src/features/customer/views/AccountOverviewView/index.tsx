import { Typography, Paper, Grid, Box } from '@mui/material';
// import { useAppSelector } from '../../../store/hooks';

const AccountOverviewView: React.FC = () => {
  //   const user = useAppSelector((state) => state.auth.user);
  const user = {
    username: 'naruto',
  };

  const accounts = [
    {
      id: '1',
      type: 'Savings',
      balance: 5000,
      accountNumber: '1234-5678-9012',
    },
    {
      id: '2',
      type: 'Checking',
      balance: 2500,
      accountNumber: '9876-5432-1098',
    },
  ];

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Welcome, {user?.username || 'Customer'}!
      </Typography>
      <Typography variant='h6' gutterBottom>
        Your Accounts
      </Typography>
      <Grid container spacing={2}>
        {accounts.map((account) => (
          <Grid item xs={12} sm={6} key={account.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant='subtitle1'>
                {account.type} Account
              </Typography>
              <Typography>Account Number: {account.accountNumber}</Typography>
              <Typography>Balance: ${account.balance.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountOverviewView;
