import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

import { useTransactionByNumber } from '../../hooks';
import { ToastIds, Messages } from '../../../../utils/constants';
import { showError } from '../../../../utils/toast';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { EmptyState } from '../../../../components';
import { formatDate } from '../../../../utils/fornatDateUtils';

const TransactionModal = ({
  open,
  onClose,
  transactionNumber,
}: {
  open: boolean;
  onClose: () => void;
  transactionNumber: string | null;
}) => {
  const { transaction, isLoading, hasError } =
    useTransactionByNumber(transactionNumber);

  useEffect(() => {
    if (hasError && open) {
      showError(Messages.TRANSACTIONS_FETCH_ERROR, {
        toastId: ToastIds.TRANSACTION_ERROR,
      });
    }
  }, [hasError, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Transaction Details</DialogTitle>
      <DialogContent dividers>
        {isLoading && <LoadingSpinner />}
        {!isLoading && transaction && (
          <>
            <Typography>
              <strong>Transaction number:</strong>{' '}
              {transaction.transactionNumber}
            </Typography>
            <Typography>
              <strong>Type:</strong> {transaction.type}
            </Typography>
            <Typography>
              <strong>Date:</strong> {formatDate(transaction.transactionDate)}
            </Typography>
            <Typography>
              <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Source:</strong> {transaction.sourceAccount}
            </Typography>
            <Typography>
              <strong>Target:</strong> {transaction.targetAccount}
            </Typography>
            {transaction.comment && (
              <Typography>
                <strong>Comment:</strong> {transaction.comment}
              </Typography>
            )}
          </>
        )}
        {!isLoading && !transaction && !hasError && (
          <EmptyState message={Messages.TRANSACTION_NOT_FOUND} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
