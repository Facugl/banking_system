import { Modal, Typography, Button } from '@mui/material';
import React, { useEffect, useRef, useCallback } from 'react';
import { createSelector } from 'reselect';
import { Account, TransferFormValues, TransferModalProps } from '../../types';
import { useAccountActions } from '../../hooks/useAccountActions';
import TransferForm from '../TransferForm';
import { useAppSelector } from '../../../../store/hooks';
import { Messages, ToastIds } from '../../../../utils/constants';
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from '../../../../components';
import { showError, showSuccess } from '../../../../utils/toast';
import { RootState } from '../../../../store/store';
import {
  StyledModalBox,
  LoadingContainer,
  ErrorContainer,
  EmptyContainer,
  ButtonContainer,
} from './styles';

const selectAccounts = createSelector(
  (state: RootState) => state.accounts.accounts,
  (accounts: Account[]) =>
    accounts.map((acc) => ({
      accountNumber: acc.accountNumber,
      type: acc.type,
    })),
);

const TransferModal: React.FC<TransferModalProps> = ({
  open,
  sourceAccountNumber,
  onClose,
  onSuccess,
  onError,
}) => {
  const { handleTransfer, handleGetAccounts, isLoading, error } =
    useAccountActions({
      showErrorToast: false,
    });

  const accounts = useAppSelector(selectAccounts);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (open && !hasFetched.current) {
      hasFetched.current = true;
      handleGetAccounts().catch((err) => {
        const message = err.message || Messages.ACCOUNTS_FETCH_ERROR;
        showError(message);
        onError(message);
      });
    }
  }, [open, handleGetAccounts, onError]);

  const handleSubmit = useCallback(
    async (data: TransferFormValues) => {
      try {
        await handleTransfer(data.sourceAccountNumber, {
          targetAccountNumber: data.targetAccountNumber,
          amount: data.amount,
        });
        showSuccess('Successful transfer', {
          toastId: ToastIds.TRANSFER_SUCCESS,
        });
        onSuccess();
        onClose();
      } catch (err: any) {
        const errorMessage = err.message || Messages.TRANSFER_FAILED;
        showError(errorMessage);
        onError(errorMessage);
      }
    },
    [handleTransfer, onSuccess, onClose, onError],
  );

  if (isLoading) {
    return (
      <Modal open={open} onClose={onClose}>
        <LoadingContainer>
          <LoadingSpinner size={24} />
        </LoadingContainer>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal open={open} onClose={onClose}>
        <ErrorContainer>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Error
          </Typography>
          <ErrorMessage message={error.frontendMessage} />
          <ButtonContainer>
            <Button
              variant='contained'
              onClick={() =>
                handleGetAccounts().catch((err) => {
                  const message = err.message || Messages.ACCOUNTS_FETCH_ERROR;
                  showError(message);
                  onError(message);
                })
              }
            >
              Retry
            </Button>
            <Button variant='outlined' onClick={onClose}>
              Close
            </Button>
          </ButtonContainer>
        </ErrorContainer>
      </Modal>
    );
  }

  if (accounts.length <= 1) {
    return (
      <Modal open={open} onClose={onClose}>
        <EmptyContainer>
          <Typography variant='h6' sx={{ mb: 2 }}>
            No accounts available
          </Typography>
          <EmptyState message='You need at least two accounts to make a transfer.' />
          <ButtonContainer>
            <Button variant='outlined' onClick={onClose}>
              Close
            </Button>
          </ButtonContainer>
        </EmptyContainer>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Transfer from Account {sourceAccountNumber}
        </Typography>
        <TransferForm
          accounts={accounts}
          sourceAccountNumber={sourceAccountNumber}
          onSubmit={handleSubmit}
        />
      </StyledModalBox>
    </Modal>
  );
};

export default React.memo(TransferModal);
