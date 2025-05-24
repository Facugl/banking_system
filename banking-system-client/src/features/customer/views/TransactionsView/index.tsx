import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

const TransactionsView: React.FC = () => {
  const transactions = [
    { id: '1', date: '2025-05-20', description: 'Deposit', amount: 1000 },
    { id: '2', date: '2025-05-21', description: 'Withdrawal', amount: -200 },
  ];

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Transaction History
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align='right'>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell align='right'>${tx.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TransactionsView;
