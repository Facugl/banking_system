import { Modal, Typography, TextField, Button } from '@mui/material';
import { useAccountActions } from '../../hooks/useAccountActions';
import { Messages } from '../../../../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { DepositFormValues, DepositModalProps } from '../../types';
import { StyledModalBox, StyledForm, ButtonContainer } from '../styled';
import { depositValidationSchema } from '../../validation/depositValidationSchema';

const DepositModal: React.FC<DepositModalProps> = ({
  open,
  accountNumber,
  onClose,
  onSuccess,
  onError,
}) => {
  const { handleDeposit, isLoading, error } = useAccountActions({
    showErrorToast: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: yupResolver(depositValidationSchema),
    defaultValues: { amount: 0, comment: '' },
  });

  const onSubmit = async (data: DepositFormValues) => {
    try {
      await handleDeposit(accountNumber, {
        amount: data.amount,
        comment: data.comment || undefined,
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      onError(err.message || Messages.DEPOSIT_FAILED);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='deposit-modal-title'>
      <StyledModalBox>
        <Typography id='deposit-modal-title' variant='h6' sx={{ mb: 2 }}>
          Deposit to Account {accountNumber}
        </Typography>
        {error && <ErrorMessage message={error.frontendMessage} />}
        {isLoading && <LoadingSpinner />}

        <StyledForm component='form' onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              variant='contained'
              type='submit'
              disabled={isLoading}
              aria-label='Confirm deposit'
            >
              Deposit
            </Button>
            <Button
              variant='outlined'
              onClick={onClose}
              disabled={isLoading}
              aria-label='Cancel deposit'
            >
              Cancel
            </Button>
          </ButtonContainer>
        </StyledForm>
      </StyledModalBox>
    </Modal>
  );
};

export default DepositModal;
