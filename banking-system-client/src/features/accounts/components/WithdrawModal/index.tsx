import { Modal, TextField, Button, Typography } from '@mui/material';
import { useAccountActions } from '../../hooks/useAccountActions';
import { Messages } from '../../../../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { WithdrawFormValues, WithdrawModalProps } from '../../types';
import { withdrawValidationSchema } from '../../validation/withdrawValidationSchema';
import { StyledModalBox, StyledForm, ButtonContainer } from '../styled';

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  open,
  accountNumber,
  onClose,
  onSuccess,
  onError,
}) => {
  const { handleWithdraw, isLoading, error } = useAccountActions({
    showErrorToast: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WithdrawFormValues>({
    resolver: yupResolver(withdrawValidationSchema),
    defaultValues: { amount: 0, comment: '' },
  });

  const onSubmit = async (data: WithdrawFormValues) => {
    try {
      await handleWithdraw(accountNumber, {
        amount: data.amount,
        comment: data.comment || undefined,
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.message || Messages.WITHDRAW_FAILED;
      onError(message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='withdraw-modal-title'>
      <StyledModalBox>
        <Typography id='withdraw-modal-title' variant='h6' mb={2}>
          Withdraw from Account {accountNumber}
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
              aria-label='Confirm withdrawal'
            >
              Withdraw
            </Button>
            <Button
              variant='outlined'
              onClick={onClose}
              disabled={isLoading}
              aria-label='Cancel withdrawal'
            >
              Cancel
            </Button>
          </ButtonContainer>
        </StyledForm>
      </StyledModalBox>
    </Modal>
  );
};

export default WithdrawModal;
