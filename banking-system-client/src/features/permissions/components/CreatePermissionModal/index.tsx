import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { permissionSchema } from '../../validation/permissionSchema';
import { PermissionResponse } from '../../types';
import { useAppSelector } from '../../../../store/hooks';

interface PermissionFormValues {
  role: string;
  operation: string;
}

interface CreatePermissionModalProps {
  open: boolean;
  permission: PermissionResponse | null;
  onClose: () => void;
  onSave: (role: string, operation: string) => void;
}

const CreatePermissionModal: React.FC<CreatePermissionModalProps> = ({
  open,
  permission,
  onClose,
  onSave,
}) => {
  const { roles } = useAppSelector((state) => state.roles);
  const { operations } = useAppSelector((state) => state.operations);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PermissionFormValues>({
    resolver: yupResolver(permissionSchema),
    defaultValues: {
      role: '',
      operation: '',
    },
  });

  useEffect(() => {
    if (permission) {
      reset({
        role: permission.role,
        operation: permission.operation,
      });
    } else {
      reset({
        role: '',
        operation: '',
      });
    }
  }, [permission, reset]);

  const onSubmit = (data: PermissionFormValues) => {
    onSave(data.role, data.operation);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        {permission ? 'Edit Permission' : 'Create Permission'}
      </DialogTitle>

      <DialogContent>
        <FormControl fullWidth margin='normal' error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <Select {...field} label='Role'>
                <MenuItem value='' disabled>
                  Select a role
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.name} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin='normal' error={!!errors.operation}>
          <InputLabel>Operation</InputLabel>
          <Controller
            name='operation'
            control={control}
            render={({ field }) => (
              <Select {...field} label='Operation'>
                <MenuItem value='' disabled>
                  Select an operation
                </MenuItem>
                {operations.map((op) => (
                  <MenuItem key={op.name} value={op.name}>
                    {op.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.operation?.message}</FormHelperText>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePermissionModal;
