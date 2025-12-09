import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  OperationResponse,
  OperationCreateRequest,
  OperationUpdateRequest,
} from '../../types';
import {
  OperationCreateRequestSchema,
  OperationUpdateRequestSchema,
} from '../../validation/operationSchema';
import { useAppSelector } from '../../../../store/hooks';

interface EditOperationModalProps {
  open: boolean;
  operation: OperationResponse | null;
  onClose: () => void;
  onSave: (
    id: number | null,
    data: OperationCreateRequest | OperationUpdateRequest,
  ) => void;
}

const EditOperationModal: React.FC<EditOperationModalProps> = ({
  open,
  operation,
  onClose,
  onSave,
}) => {
  const isEdit = !!operation;

  const schema = isEdit
    ? OperationUpdateRequestSchema
    : OperationCreateRequestSchema;

  const { modules } = useAppSelector((state) => state.modules);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OperationCreateRequest | OperationUpdateRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      path: '',
      httpMethod: '',
      permitAll: false,
      moduleId: undefined,
    },
  });

  useEffect(() => {
    if (operation) {
      const moduleMatch = modules.find(
        (m) => m.name.toUpperCase() === operation.moduleName.toUpperCase(),
      );

      reset({
        name: operation.name,
        path: operation.path,
        httpMethod: operation.httpMethod,
        permitAll: operation.permitAll,
        moduleId: moduleMatch?.id ?? undefined,
      });
    } else {
      reset({
        name: '',
        path: '',
        httpMethod: '',
        permitAll: false,
        moduleId: undefined,
      });
    }
  }, [operation, modules, reset]);

  const onSubmit = (data: OperationCreateRequest | OperationUpdateRequest) => {
    const cleanPath = data.path?.replace(/"/g, '') ?? '';

    onSave(operation ? operation.id : null, {
      ...data,
      path: cleanPath,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        {operation ? 'Edit Operation' : 'Create Operation'}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label='Name'
          margin='normal'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label='Path'
          margin='normal'
          {...register('path')}
          error={!!errors.path}
          helperText={errors.path?.message}
        />

        <TextField
          fullWidth
          label='HTTP Method'
          margin='normal'
          {...register('httpMethod')}
          error={!!errors.httpMethod}
          helperText={errors.httpMethod?.message}
        />

        <FormControlLabel
          control={<Checkbox {...register('permitAll')} />}
          label='Permit All'
        />

        <TextField
          select
          fullWidth
          label='Module'
          margin='normal'
          {...register('moduleId')}
          error={!!errors.moduleId}
          helperText={errors.moduleId?.message}
        >
          {modules.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>
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

export default EditOperationModal;
