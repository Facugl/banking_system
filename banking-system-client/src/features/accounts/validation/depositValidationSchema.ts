import * as yup from 'yup';
import { Messages } from '../../../utils/constants';

export const depostiValidationSchema = yup.object({
  amount: yup
    .number()
    .required(Messages.AMOUNT_REQUIRED)
    .positive(Messages.INVALID_AMOUNT)
    .min(0.01, Messages.INVALID_AMOUNT),
});
