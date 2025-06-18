import { Modal, TextField, Button, Typography } from '@mui/material';
import { useAccountActions } from '../../hooks/useAccountActions';
import { Messages } from '../../../../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { WithdrawModalProps } from '../../types';
import { withdrawValidationSchema } from '../../validation/withdrawValidationSchema';
import { StyledModalBox, StyledForm, ButtonContainer } from './styles';

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
  } = useForm<{ amount: number }>({
    resolver: yupResolver(withdrawValidationSchema),
    defaultValues: { amount: 0 },
  });

  const onSubmit = async (data: { amount: number }) => {
    try {
      await handleWithdraw(accountNumber, { amount: data.amount });
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.message || Messages.WITHDRAW_FAILED;
      onError(message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <Typography variant='h6' mb={2}>
          Withdraw from Account {accountNumber}
        </Typography>

        {error && <ErrorMessage message={error.frontendMessage} />}
        {isLoading && <LoadingSpinner size={24} />}

        {!isLoading && (
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
            <ButtonContainer>
              <Button variant='contained' type='submit' disabled={isLoading}>
                Withdraw
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

export default WithdrawModal;
