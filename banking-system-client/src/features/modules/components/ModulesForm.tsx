import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useAppDispatch } from '../../../store/hooks';
import { createModule, updateModule } from '../thunks';
import moduleSchema from '../validation/moduleSchema';

type ModuleFormProps = {
  initialValues?: { id?: number; name: string; basePath: string };
  onClose: () => void;
};

const ModuleForm: React.FC<ModuleFormProps> = ({ initialValues, onClose }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || { name: '', basePath: '' },
    resolver: yupResolver(moduleSchema),
  });

  const onSubmit = async (data: any) => {
    if (initialValues?.id) {
      await dispatch(updateModule({ id: initialValues.id, module: data }));
    } else {
      await dispatch(createModule(data));
    }
    onClose(); // Cierra el modal al guardar
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        label='BasePath'
        error={!!errors.basePath}
        helperText={errors.basePath?.message}
        fullWidth
        margin='normal'
      />
      <Button type='submit' variant='contained' color='primary'>
        {initialValues?.id ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};

export default ModuleForm;
