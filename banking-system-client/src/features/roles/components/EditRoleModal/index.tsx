import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoleResponse } from '../../types';
import { roleSchema } from '../../validation/roleSchema';

interface EditRoleModalProps {
  open: boolean;
  role: RoleResponse | null;
  onClose: () => void;
  onSave: (id: number | null, name: string) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  open,
  role,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(roleSchema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (role) {
      reset({ name: role.name });
    } else {
      reset({ name: '' });
    }
  }, [role, reset]);

  const onSubmit = (data: { name: string }) => {
    onSave(role ? role.id : null, data.name);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{role ? 'Edit Role' : 'Create Role'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Role Name"
          margin="normal"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleModal;