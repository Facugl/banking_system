import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  changeAccountStatus,
  createAccount,
  deleteAccount,
  deposit,
  getAccount,
  getAccountBalance,
  getAccounts,
  transfer,
  updateAccount,
  withdraw,
} from '../thunks';
import {
  AccountCreateRequest,
  AccountOperationRequest,
  AccountStatusRequest,
  AccountUpdateRequest,
  TransferRequest,
  UseAccountActionsOptions,
  UseAccountActionsReturn,
} from '../types';
import { showError, showSuccess } from '../../../utils/toast';
import { Messages, ToastIds } from '../../../utils/constants';

const withAsyncAction = async <T>(
  action: () => Promise<T>,
  successMessage: string,
  errorMessage: string,
  options: { showSuccessToast: boolean; showErrorToast: boolean },
  toastIds: { success: string; error: string },
) => {
  const result = await action();
  if ((result as any).type?.includes('rejected')) {
    const errorMsg = (result as any).payload?.frontendMessage || errorMessage;
    if (options.showErrorToast) {
      showError(errorMsg, { toastId: toastIds.error });
    }
    throw new Error(errorMsg);
  }
  if (options.showSuccessToast) {
    showSuccess(successMessage, { toastId: toastIds.success, autoClose: 2000 });
  }
};

export const useAccountActions = ({
  showSuccessToast = true,
  showErrorToast = true,
}: UseAccountActionsOptions = {}): UseAccountActionsReturn => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error,
    hasFetchedAccounts,
    isFetchingAccounts,
    isOperating,
  } = useAppSelector((state) => state.accounts);

  const handleCreateAccount = async (account: AccountCreateRequest) => {
    await withAsyncAction(
      () => dispatch(createAccount(account)),
      'Account created successfully!',
      Messages.ACCOUNT_CREATE_FAILED,
      { showSuccessToast, showErrorToast },
      {
        success: ToastIds.ACCOUNT_CREATE_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleGetAccount = async (accountNumber: string) => {
    await withAsyncAction(
      () => dispatch(getAccount(accountNumber)),
      'Account fetched successfully!',
      Messages.ACCOUNT_FETCH_ERROR,
      { showSuccessToast: false, showErrorToast },
      {
        success: ToastIds.ACCOUNT_FETCH_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleGetAccounts = async () => {
    if (hasFetchedAccounts) {
      return;
    }
    await withAsyncAction(
      () => dispatch(getAccounts()),
      'Accounts fetched successfully!',
      Messages.ACCOUNTS_FETCH_ERROR,
      { showSuccessToast: false, showErrorToast },
      {
        success: ToastIds.ACCOUNTS_FETCH_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleUpdateAccount = async (
    accountNumber: string,
    account: AccountUpdateRequest,
  ) => {
    await withAsyncAction(
      () => dispatch(updateAccount({ accountNumber, account })),
      'Account updated successfully!',
      Messages.ACCOUNT_UPDATE_FAILED,
      { showSuccessToast, showErrorToast },
      {
        success: ToastIds.ACCOUNT_UPDATE_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleChangeAccountStatus = async (
    accountNumber: string,
    status: AccountStatusRequest,
  ) => {
    await withAsyncAction(
      () => dispatch(changeAccountStatus({ accountNumber, status })),
      'Account status updated successfully!',
      Messages.ACCOUNT_STATUS_UPDATE_FAILED,
      { showSuccessToast, showErrorToast },
      {
        success: ToastIds.ACCOUNT_STATUS_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleDeleteAccount = async (accountNumber: string) => {
    await withAsyncAction(
      () => dispatch(deleteAccount(accountNumber)),
      'Account deleted successfully!',
      Messages.ACCOUNT_DELETE_FAILED,
      { showSuccessToast, showErrorToast },
      {
        success: ToastIds.ACCOUNT_DELETE_SUCCESS,
        error: ToastIds.ACCOUNT_ERROR,
      },
    );
  };

  const handleGetAccountBalance = async (accountNumber: string) => {
    await withAsyncAction(
      () => dispatch(getAccountBalance(accountNumber)),
      'Balance fetched successfully!',
      Messages.FETCH_ACCOUNT_BALANCE_FAILED,
      { showSuccessToast: false, showErrorToast },
      { success: ToastIds.BALANCE_SUCCESS, error: ToastIds.BALANCE_ERROR },
    );
  };

  const handleDeposit = async (
    accountNumber: string,
    operationData: AccountOperationRequest,
  ) => {
    await withAsyncAction(
      () => dispatch(deposit({ accountNumber, operationData })),
      'Deposit successful!',
      Messages.DEPOSIT_FAILED,
      { showSuccessToast, showErrorToast },
      { success: ToastIds.DEPOSIT_SUCCESS, error: ToastIds.ACCOUNT_ERROR },
    );
  };

  const handleWithdraw = async (
    accountNumber: string,
    operationData: AccountOperationRequest,
  ) => {
    await withAsyncAction(
      () => dispatch(withdraw({ accountNumber, operationData })),
      'Withdrawal successful!',
      Messages.WITHDRAW_FAILED,
      { showSuccessToast, showErrorToast },
      { success: ToastIds.WITHDRAW_SUCCESS, error: ToastIds.ACCOUNT_ERROR },
    );
  };

  const handleTransfer = async (
    sourceAccountNumber: string,
    transferData: TransferRequest,
  ) => {
    await withAsyncAction(
      () => dispatch(transfer({ sourceAccountNumber, transferData })),
      'Transfer successful!',
      Messages.TRANSFER_FAILED,
      { showSuccessToast, showErrorToast },
      { success: ToastIds.TRANSFER_SUCCESS, error: ToastIds.ACCOUNT_ERROR },
    );
  };

  const resetAccountsFetch = () => {
    dispatch({ type: 'accounts/resetFetch' });
  };

  return {
    handleCreateAccount,
    handleGetAccount,
    handleGetAccounts,
    handleUpdateAccount,
    handleChangeAccountStatus,
    handleDeleteAccount,
    handleGetAccountBalance,
    handleDeposit,
    handleWithdraw,
    handleTransfer,
    isLoading,
    error,
    resetAccountsFetch,
    isFetchingAccounts,
    isOperating,
  };
};
