import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { TransactionModal, TransactionSearchBar } from '../components';
import { Transaction } from '../types';
import { useTransactions } from '../hooks';
import { LoadingSpinner } from '../../../components';
import { formatDate } from '../../../utils/fornatDateUtils';
import { Messages } from '../../../utils/constants';

const TransactionsView: React.FC = () => {
  const { transactions, isLoading, fetchTransactions } = useTransactions();
  const [selectedTransactionNumber, setSelectedTransactionNumber] = useState<
    string | null
  >(null);
  const [openModal, setOpenModal] = useState(false);

  const handleRowClick = (txNumber: string) => {
    setSelectedTransactionNumber(txNumber);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransactionNumber(null);
  };

  const handleSearch = (transactionNumber: string) => {
    setSelectedTransactionNumber(transactionNumber);
    setOpenModal(true);
  };

  const handleRefresh = () => {
    fetchTransactions();
  };

  if (isLoading && transactions.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <Box p={2}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h6'>Transaction History</Typography>
        <Button variant='outlined' onClick={handleRefresh} disabled={isLoading}>
          Refresh
        </Button>
      </Box>

      <TransactionSearchBar onSearch={handleSearch} />

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box display='flex' justifyContent='center' py={2}>
                    <LoadingSpinner size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  {Messages.TRANSACTIONS_NOT_FOUND}
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx: Transaction) => (
                <TableRow
                  key={tx.transactionNumber}
                  hover
                  onClick={() => handleRowClick(tx.transactionNumber)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{formatDate(tx.transactionDate)}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell align='right'>${tx.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <TransactionModal
        open={openModal}
        onClose={handleCloseModal}
        transactionNumber={selectedTransactionNumber}
      />
    </Box>
  );
};

export default TransactionsView;
