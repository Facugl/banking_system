import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  changeAccountStatus,
  deposit,
  withdraw,
  transfer,
} from './thunks';
import type { AccountsState, Account } from './types';
import type { TransactionResponse } from '../transactions/types';

const initialState: AccountsState = {
  accounts: [],
  isLoading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAccounts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accounts = payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createAccount.fulfilled,
        (state, action: PayloadAction<Account>) => {
          state.accounts.push(action.payload);
        },
      )
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        const index = state.accounts.findIndex(
          (account) => account.accountNumber === payload.accountNumber,
        );
        if (index !== -1) {
          state.accounts[index] = payload;
        }
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.accounts = state.accounts.filter(
          (account) => account.accountNumber !== payload,
        );
      })
      .addCase(changeAccountStatus.fulfilled, (state, { payload }) => {
        const index = state.accounts.findIndex(
          (account) => account.accountNumber === payload.accountNumber,
        );
        if (index !== -1) {
          state.accounts[index] = payload;
        }
      })
      .addCase(
        deposit.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          const index = state.accounts.findIndex(
            (account) => account.accountNumber === payload.targetAccount,
          );
          if (index !== -1) {
            state.accounts[index].balance += payload.amount;
          }
        },
      )
      .addCase(
        withdraw.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          const index = state.accounts.findIndex(
            (account) => account.accountNumber === payload.sourceAccount,
          );
          if (index !== -1) {
            state.accounts[index].balance -= payload.amount;
          }
        },
      )
      .addCase(
        transfer.fulfilled,
        (state, { payload }: PayloadAction<TransactionResponse>) => {
          const sourceIndex = state.accounts.findIndex(
            (account) => account.accountNumber === payload.sourceAccount,
          );
          const targetIndex = state.accounts.findIndex(
            (account) => account.accountNumber === payload.targetAccount,
          );
          if (sourceIndex !== -1) {
            state.accounts[sourceIndex].balance -= payload.amount;
          }
          if (targetIndex !== -1) {
            state.accounts[targetIndex].balance += payload.amount;
          }
        },
      );
  },
});

export default accountsSlice.reducer;
