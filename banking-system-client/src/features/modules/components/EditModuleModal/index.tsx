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
import { ModuleResponse } from '../../types';
import moduleSchema from '../../validation/moduleSchema';

type EditModuleModalProps = {
  open: boolean;
  module: ModuleResponse | null;
  onClose: () => void;
  onSave: (id: number | null, name: string, basePath: string) => void;
};

const EditModuleModal: React.FC<EditModuleModalProps> = ({
  open,
  module,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(moduleSchema),
    defaultValues: {
      name: '',
      basePath: '',
    },
  });

  useEffect(() => {
    if (module) {
      reset({ name: module.name, basePath: module.basePath });
    } else {
      reset({
        name: '',
        basePath: '',
      });
    }
  }, [module, reset]);

  const onSubmit = (data: { name: string; basePath: string }) => {
    onSave(module ? module.id : null, data.name, data.basePath);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{module ? 'Edit Module' : 'Create Module'}</DialogTitle>
      <DialogContent>
        <TextField
          {...register('name')}
          label='Name'
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin='normal'
        />
        <TextField
          {...register('basePath')}
          label='Base Path'
          error={!!errors.basePath}
          helperText={errors.basePath?.message}
          fullWidth
          margin='normal'
        />
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

export default EditModuleModal;
