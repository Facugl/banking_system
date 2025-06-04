import {
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { getAccounts } from '../../../accounts/thunks';
import { Link } from 'react-router-dom';

const AccountOverviewView: React.FC = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const { accounts } = useAppSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <Box p={2}>
      <Typography variant='h4' gutterBottom>
        Welcome {username}!
      </Typography>
      <Typography variant='h6' gutterBottom>
        Your Accounts
      </Typography>
      <Box display='flex' flexWrap='wrap' gap={2}>
        {accounts.map((account) => (
          <Card key={account.accountNumber} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant='h6'>{account.type} Account</Typography>
              <Typography color='textSecondary'>
                Account Number: {account.accountNumber}
              </Typography>
              <Typography variant='body1'>
                Balance: ${account.balance.toFixed(2)}
              </Typography>
              <Box mt={2}>
                <Button
                  variant='outlined'
                  component={Link}
                  to={`/customer-panel/transactions?account=${account.accountNumber}`}
                  sx={{ mr: 1 }}
                >
                  View Transactions
                </Button>
                <Button
                  variant='outlined'
                  component={Link}
                  to={`/customer-panel/transfers?account=${account.accountNumber}`}
                >
                  Transfer Money
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AccountOverviewView;
