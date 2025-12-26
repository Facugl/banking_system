import React, { useEffect, useRef } from 'react';
import { Modal, Typography, Button, TextField, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../store/hooks';
import { useAccountActions } from '../../hooks/useAccountActions';
import { StyledModalBox, StyledForm, ButtonContainer } from '../styled';
import { TransferFormValues, TransferModalProps } from '../../types';
import { transferValidationSchema } from '../../validation/transferValidationSchema';
import { Messages } from '../../../../utils/constants';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { showError } from '../../../../utils/toast';
import { RootState } from '../../../../store/store';

const selectAccountsRaw = (state: RootState) => state.accounts.accounts;

const selectTransferAccounts = createSelector([selectAccountsRaw], (accounts) =>
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

  const accounts = useAppSelector(selectTransferAccounts);

  const hasFetched = useRef(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: yupResolver(transferValidationSchema),
    context: { accounts },
    defaultValues: {
      sourceAccountNumber: sourceAccountNumber || '',
      targetAccountNumber: '',
      amount: 0,
      comment: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (open && !hasFetched.current) {
      hasFetched.current = true;
      handleGetAccounts().catch((err) => {
        const msg = err.message || Messages.ACCOUNTS_FETCH_ERROR;
        showError(msg);
        onError(msg);
      });
    }
  }, [open, handleGetAccounts, onError]);

  const onSubmit = async (data: TransferFormValues) => {
    try {
      await handleTransfer(data.sourceAccountNumber, {
        targetAccountNumber: data.targetAccountNumber,
        amount: data.amount,
        comment: data.comment || undefined,
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || Messages.TRANSFER_FAILED;
      showError(msg);
      onError(msg);
    }
  };

  const filteredAccounts = accounts.filter(
    (acc) => acc.accountNumber !== sourceAccountNumber,
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='transfer-modal-title'>
      <StyledModalBox>
        <Typography id='transfer-modal-title' variant='h6' mb={2}>
          Transfer from Account {sourceAccountNumber}
        </Typography>

        {error && <ErrorMessage message={error.frontendMessage} />}
        {isLoading && <LoadingSpinner />}

        {accounts.length <= 1 ? (
          <Typography>No accounts available to transfer.</Typography>
        ) : (
          <StyledForm component='form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='sourceAccountNumber'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label='Source Account'
                  fullWidth
                  margin='normal'
                  disabled={!!sourceAccountNumber || isLoading}
                  error={!!errors.sourceAccountNumber}
                  helperText={errors.sourceAccountNumber?.message}
                >
                  <MenuItem value=''>Select an account</MenuItem>
                  {accounts.map((acc) => (
                    <MenuItem key={acc.accountNumber} value={acc.accountNumber}>
                      {acc.type} - {acc.accountNumber}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name='targetAccountNumber'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label='Target Account'
                  fullWidth
                  margin='normal'
                  disabled={isLoading}
                  error={!!errors.targetAccountNumber}
                  helperText={errors.targetAccountNumber?.message}
                >
                  <MenuItem value=''>Select an account</MenuItem>
                  {filteredAccounts.map((acc) => (
                    <MenuItem key={acc.accountNumber} value={acc.accountNumber}>
                      {acc.type} - {acc.accountNumber}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name='amount'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Amount'
                  type='number'
                  fullWidth
                  margin='normal'
                  disabled={isLoading}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  inputProps={{ min: 0.01, step: 0.01 }}
                />
              )}
            />
            <Controller
              name='comment'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Comment (optional)'
                  fullWidth
                  margin='normal'
                  disabled={isLoading}
                  error={!!errors.comment}
                  helperText={errors.comment?.message}
                />
              )}
            />
            <ButtonContainer>
              <Button variant='contained' type='submit' disabled={isLoading}>
                Transfer
              </Button>
              <Button variant='outlined' onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
            </ButtonContainer>
          </StyledForm>
        )}
      </StyledModalBox>
    </Modal>
  );
};

export default TransferModal;
