import { useForm } from 'react-hook-form';
import { Typography, Box, TextField, Button, MenuItem } from '@mui/material';

interface TransferForm {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

const TransfersView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferForm>();

  const accounts = [
    { id: '1', name: 'Savings (1234-5678-9012)' },
    { id: '2', name: 'Checking (9876-5432-1098)' },
  ];

  const onSubmit = (data: TransferForm) => {
    console.log('Transfer:', data);
    // Dispatch transfer action to Redux
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Transfer Funds
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          select
          label='From Account'
          fullWidth
          {...register('fromAccount', { required: 'Select an account' })}
          error={!!errors.fromAccount}
          helperText={errors.fromAccount?.message}
          margin='normal'
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label='To Account'
          fullWidth
          {...register('toAccount', { required: 'Select an account' })}
          error={!!errors.toAccount}
          helperText={errors.toAccount?.message}
          margin='normal'
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Amount'
          type='number'
          fullWidth
          {...register('amount', { required: 'Enter an amount', min: 1 })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          margin='normal'
        />
        <Button type='submit' variant='contained' sx={{ mt: 2 }}>
          Transfer
        </Button>
      </form>
    </Box>
  );
};

export default TransfersView;
