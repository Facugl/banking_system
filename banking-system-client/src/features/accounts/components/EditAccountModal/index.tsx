import { useEffect } from 'react';
import { Modal, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AccountCreateRequest,
  AccountUpdateRequest,
  AccountType,
  AccountStatus,
  EditModalProps,
} from '../../types';
import { ErrorMessage, LoadingSpinner } from '../../../../components';
import { editAccountValidationSchema } from '../../validation/editAccountValidationSchema';
import {
  StyledModalBox,
  StyledTextField,
  ButtonContainer,
  StyledButton,
} from './styles';

const EditAccountModal: React.FC<EditModalProps> = ({
  open,
  account,
  onClose,
  onSave,
  isLoading,
  error,
  isAdmin = false,
}) => {
  const { control, handleSubmit, reset } = useForm<
    AccountUpdateRequest | AccountCreateRequest
  >({
    resolver: yupResolver(editAccountValidationSchema, {
      context: { isUpdate: !!account },
    }),
    defaultValues: {
      type: account ? account.type : AccountType.CHECKING,
      balance: account ? account.balance : 0,
      status: account ? account.status : AccountStatus.ACTIVE,
    },
  });

  useEffect(() => {
    if (account) {
      reset({
        type: account.type,
        balance: account.balance,
        status: account.status,
      });
    } else {
      reset({
        type: AccountType.CHECKING,
        balance: 0,
        status: AccountStatus.ACTIVE,
      });
    }
  }, [account, reset]);

  const onSubmit = (data: AccountUpdateRequest | AccountCreateRequest) => {
    if (!account) {
      const createData: AccountCreateRequest = {
        type: data.type as AccountType,
        balance: data.balance as number,
        status: data.status as AccountStatus,
      };
      onSave(createData);
    } else {
      onSave(data as AccountUpdateRequest);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox component='form' onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage message={error} />}
        {isLoading && <LoadingSpinner size={24} />}

        <Controller
          name='type'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              {...field}
              fullWidth
              select
              label='Type'
              error={!!error}
              helperText={error?.message}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || undefined)}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {Object.values(AccountType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />

        <Controller
          name='balance'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              {...field}
              fullWidth
              label='Balance'
              type='number'
              error={!!error}
              helperText={error?.message}
              value={field.value ?? ''}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              disabled={!isAdmin && !!account}
            />
          )}
        />

        <Controller
          name='status'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              {...field}
              fullWidth
              select
              label='Status'
              error={!!error}
              helperText={error?.message}
              disabled={!isAdmin}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || undefined)}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {Object.values(AccountStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />

        <ButtonContainer>
          <StyledButton variant='text' onClick={onClose}>
            Cancel
          </StyledButton>
          <StyledButton variant='contained' type='submit'>
            Save
          </StyledButton>
        </ButtonContainer>
      </StyledModalBox>
    </Modal>
  );
};

export default EditAccountModal;
