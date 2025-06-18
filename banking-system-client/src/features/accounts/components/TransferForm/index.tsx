import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@mui/material';
import { TransferFormProps, TransferFormValues } from '../../types';
import { transferValidationSchema } from '../../validation/transferValidationSchema';
import { StyledForm, ButtonWrapper } from './styles';

const TransferForm: React.FC<TransferFormProps> = ({
  accounts,
  sourceAccountNumber,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TransferFormValues>({
    resolver: yupResolver(transferValidationSchema),
    context: { accounts },
    defaultValues: {
      sourceAccountNumber: sourceAccountNumber || '',
      targetAccountNumber: '',
      amount: 0,
    },
    mode: 'onChange',
  });

  return (
    <StyledForm component='form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='sourceAccountNumber'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label='Source Account'
            error={!!errors.sourceAccountNumber}
            helperText={errors.sourceAccountNumber?.message}
            SelectProps={{ native: true }}
            fullWidth
            disabled={!!sourceAccountNumber}
          >
            <option value=''>Select an account</option>
            {accounts.map((account) => (
              <option key={account.accountNumber} value={account.accountNumber}>
                {account.type} - {account.accountNumber}
              </option>
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
            label='Target Account'
            error={!!errors.targetAccountNumber}
            helperText={errors.targetAccountNumber?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name='amount'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type='number'
            label='Amount'
            error={!!errors.amount}
            helperText={errors.amount?.message}
            fullWidth
            inputProps={{ min: 0.01, step: 0.01 }}
          />
        )}
      />
      <ButtonWrapper>
        <Button type='submit' variant='contained' disabled={!isValid}>
          Make Transfer
        </Button>
      </ButtonWrapper>
    </StyledForm>
  );
};

export default TransferForm;
