import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionsState } from './types';
import { AppError } from '../../types';
import { getTransaction, getTransactions } from './thunks';

const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactionError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = state.transactions.filter(
          (t) => t.transactionNumber !== action.payload.transactionNumber,
        );
        state.transactions = [...updated, action.payload];
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? ({} as AppError);
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.isLoading = false;
          state.transactions = action.payload;
        },
      )
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? ({} as AppError);
      });
  },
});

export const { clearTransactionError } = transactionSlice.actions;

export default transactionSlice.reducer;
