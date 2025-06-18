import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import {
  AccountCreateRequest,
  AccountStatus,
  AccountType,
  AccountUpdateRequest,
} from '../types';

export const editAccountValidationSchema: ObjectSchema<
  AccountUpdateRequest | AccountCreateRequest
> = yup.object({
  type: yup.mixed<AccountType>().when('$isUpdate', {
    is: false,
    then: (schema) =>
      schema
        .required('Type is required')
        .oneOf(Object.values(AccountType), 'Invalid account type'),
    otherwise: (schema) =>
      schema
        .optional()
        .oneOf(
          [...Object.values(AccountType), undefined],
          'Invalid account type',
        ),
  }),
  balance: yup.number().when('$isUpdate', {
    is: false,
    then: (schema) =>
      schema
        .required('Balance is required')
        .min(0, 'Balance must be a positive number'),
    otherwise: (schema) =>
      schema.optional().min(0, 'Balance must be a positive number'),
  }),
  status: yup.mixed<AccountStatus>().when('$isUpdate', {
    is: true,
    then: (schema) =>
      schema
        .required('Status is required')
        .oneOf(Object.values(AccountStatus), 'Invalid status'),
    otherwise: (schema) =>
      schema
        .required('Status is required')
        .oneOf(Object.values(AccountStatus), 'Invalid status'),
  }),
});
