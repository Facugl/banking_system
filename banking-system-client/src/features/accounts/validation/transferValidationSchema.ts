import * as yup from 'yup';
import { Messages } from '../../../utils/constants';

export const transferValidationSchema = yup.object().shape({
  sourceAccountNumber: yup
    .string()
    .required(Messages.TARGET_ACCOUNT_REQUIRED)
    .test('is-valid-account', 'Invalid source account', function (value) {
      const { accounts } = this.options.context as {
        accounts: { accountNumber: string }[];
      };
      return accounts.some((account) => account.accountNumber === value);
    }),
  targetAccountNumber: yup
    .string()
    .required(Messages.TARGET_ACCOUNT_REQUIRED)
    .test('is-valid-account', 'Invalid target account', function (value) {
      const { accounts } = this.options.context as {
        accounts: { accountNumber: string }[];
      };
      return accounts.some((account) => account.accountNumber === value);
    })
    .test('not-same-account', Messages.SAME_ACCOUNT_TRANSFER, function (value) {
      return value !== this.parent.sourceAccountNumber;
    }),
  amount: yup
    .number()
    .required(Messages.AMOUNT_REQUIRED)
    .positive(Messages.INVALID_AMOUNT)
    .typeError(Messages.INVALID_AMOUNT),
});
