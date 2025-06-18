import { Modal, Typography } from '@mui/material';
import { useAccountActions } from '../../hooks/useAccountActions';
import { Messages } from '../../../../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { depostiValidationSchema } from '../../validation/depositValidationSchema';
import { DepositModalProps } from '../../types';
import {
  StyledModalBox,
  StyledForm,
  StyledTextField,
  ButtonContainer,
  StyledButton,
} from './styles';

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
  } = useForm<{ amount: number }>({
    resolver: yupResolver(depostiValidationSchema),
    defaultValues: { amount: 0 },
  });

  const onSubmit = async (data: { amount: number }) => {
    try {
      await handleDeposit(accountNumber, { amount: data.amount });
      reset();
      onSuccess();
      onClose();
    } catch (err: any) {
      onError(err.message || Messages.DEPOSIT_FAILED);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Deposit to Account {accountNumber}
        </Typography>
        {error && <ErrorMessage message={error.frontendMessage} />}
        {isLoading && <LoadingSpinner size={24} />}

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='amount'
            control={control}
            render={({ field }) => (
              <StyledTextField
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
            <StyledButton
              variant='contained'
              type='submit'
              disabled={isLoading}
            >
              Deposit
            </StyledButton>
            <StyledButton
              variant='outlined'
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </StyledButton>
          </ButtonContainer>
        </StyledForm>
      </StyledModalBox>
    </Modal>
  );
};

export default DepositModal;
