import * as yup from 'yup';

export const permissionSchema = yup.object({
  role: yup
    .string()
    .required('Role is required'),

  operation: yup
    .string()
    .required('Operation is required'),
});
