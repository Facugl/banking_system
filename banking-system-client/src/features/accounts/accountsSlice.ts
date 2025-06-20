import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getAccount,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  changeAccountStatus,
  deposit,
  withdraw,
  transfer,
  getAccountBalance,
} from './thunks';
import type { AccountsState, Account } from './types';
import type { TransactionResponse } from '../transactions/types';
import { AppError } from '../../types';
import { Messages, HttpStatus } from '../../utils/constants';

const initialState: AccountsState = {
  accountByNumber: {},
  accounts: [],
  isLoading: false,
  error: null,
  hasFetchedAccounts: false,
  isFetchingAccounts: false,
  isOperating: false,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetFetch(state) {
      state.hasFetchedAccounts = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(getAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFetchingAccounts = false;
        state.accountByNumber[payload.accountNumber] = payload;
      })
      .addCase(
        getAccount.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNT_FETCH_ERROR,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(
        getAccounts.fulfilled,
        (state, action: PayloadAction<Account[]>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.accounts = action.payload;
          state.accountByNumber = action.payload.reduce(
            (acc, account) => {
              acc[account.accountNumber] = account;
              return acc;
            },
            {} as Record<string, Account>,
          );
          state.hasFetchedAccounts = true;
        },
      )
      .addCase(
        getAccounts.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNTS_FETCH_ERROR,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
        state.isOperating = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(
        createAccount.fulfilled,
        (state, action: PayloadAction<Account>) => {
          state.isLoading = false;
          state.isOperating = false;
          state.isFetchingAccounts = false;
          state.accounts.push(action.payload);
          state.accountByNumber[action.payload.accountNumber] = action.payload;
        },
      )
      .addCase(
        createAccount.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isOperating = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNT_CREATE_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFetchingAccounts = false;
        const index = state.accounts.findIndex(
          (account) => account.accountNumber === payload.accountNumber,
        );
        if (index !== -1) {
          state.accounts[index] = payload;
        }
        state.accountByNumber[payload.accountNumber] = payload;
      })
      .addCase(
        updateAccount.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNT_UPDATE_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFetchingAccounts = false;
        state.accounts = state.accounts.filter(
          (account) => account.accountNumber !== payload,
        );
        delete state.accountByNumber[payload];
      })
      .addCase(
        deleteAccount.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNT_DELETE_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(changeAccountStatus.pending, (state) => {
        state.isLoading = true;
        state.isOperating = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(changeAccountStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isOperating = false;
        state.isFetchingAccounts = false;
        const index = state.accounts.findIndex(
          (account) => account.accountNumber === payload.accountNumber,
        );
        if (index !== -1) {
          state.accounts[index] = payload;
        }
        state.accountByNumber[payload.accountNumber] = payload;
      })
      .addCase(
        changeAccountStatus.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isOperating = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.ACCOUNT_STATUS_UPDATE_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(getAccountBalance.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(getAccountBalance.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;
        state.isFetchingAccounts = false;
        const accountNumber = meta.arg;
        const account = state.accountByNumber[accountNumber];
        if (account) {
          account.balance = payload;
          const index = state.accounts.findIndex(
            (acc) => acc.accountNumber === accountNumber,
          );
          if (index !== -1) {
            state.accounts[index].balance = payload;
          }
        }
      })
      .addCase(
        getAccountBalance.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.FETCH_ACCOUNT_BALANCE_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(
        deposit.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          const index = state.accounts.findIndex(
            (account) => account.accountNumber === payload.targetAccount,
          );
          if (index !== -1) {
            state.accounts[index].balance += payload.amount;
            state.accountByNumber[payload.targetAccount].balance +=
              payload.amount;
          }
        },
      )
      .addCase(
        deposit.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.DEPOSIT_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(withdraw.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(
        withdraw.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          const index = state.accounts.findIndex(
            (account) => account.accountNumber === payload.sourceAccount,
          );
          if (index !== -1) {
            state.accounts[index].balance -= payload.amount;
            state.accountByNumber[payload.sourceAccount].balance -=
              payload.amount;
          }
        },
      )
      .addCase(
        withdraw.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.WITHDRAW_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(transfer.pending, (state) => {
        state.isLoading = true;
        state.isFetchingAccounts = true;
        state.error = null;
      })
      .addCase(
        transfer.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          const sourceIndex = state.accounts.findIndex(
            (account) => account.accountNumber === payload.sourceAccount,
          );
          const targetIndex = state.accounts.findIndex(
            (account) => account.accountNumber === payload.targetAccount,
          );
          if (sourceIndex !== -1) {
            state.accounts[sourceIndex].balance -= payload.amount;
            state.accountByNumber[payload.sourceAccount].balance -=
              payload.amount;
          }
          if (targetIndex !== -1) {
            state.accounts[targetIndex].balance += payload.amount;
            state.accountByNumber[payload.targetAccount].balance +=
              payload.amount;
          }
        },
      )
      .addCase(
        transfer.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.isFetchingAccounts = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.TRANSFER_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      );
  },
});

export const { resetFetch } = accountsSlice.actions;
export default accountsSlice.reducer;
